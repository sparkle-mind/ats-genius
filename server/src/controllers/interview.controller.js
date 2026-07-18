import prisma from "../db/prisma.js";

// ============================================================
// 1. GET /api/interviews/stats

// ============================================================
export const getStats = async (req, res) => {
  try {
    const userId = req.user.id;
    const now = new Date();

    // --- Total interviews ---
    const totalInterviews = await prisma.interview.count({
      where: { application: { userId } },
    });

    // --- Upcoming interviews (future dates) ---
    const upcomingInterviews = await prisma.interview.count({
      where: {
        application: { userId },
        scheduledDate: { gt: now },
      },
    });

    // --- Average score (only where score exists) ---
    const avgResult = await prisma.interview.aggregate({
      where: {
        application: { userId },
        score: { not: null },
      },
      _avg: { score: true },
    });
    const averageScore = Math.round(avgResult._avg.score || 0);

    // --- Percentile (Top X% of candidates on this platform) ---
    // Step 1: Get this user's average score
    const userAvg = averageScore;

    // Step 2: Get average score for EVERY user on the platform
    const allUserAverages = await prisma.$queryRaw`
      SELECT 
        a.user_id as "userId",
        AVG(i.score) as "avgScore"
      FROM "Interview" i
      JOIN "Application" a ON a.id = i.application_id
      WHERE i.score IS NOT NULL
      GROUP BY a.user_id
    `;

    let percentile = 0;
    if (allUserAverages.length > 0) {
      // Sort ascending
      const sorted = allUserAverages
        .map((row) => Number(row.avgScore))
        .sort((a, b) => a - b);

      // Find how many users have a LOWER average than the current user
      let usersLower = 0;
      for (const avg of sorted) {
        if (avg < userAvg) usersLower++;
      }

      // Calculate percentile: (usersLower / totalUsers) * 100
      // Then invert to get "Top X%"
      const rawPercentile = (usersLower / sorted.length) * 100;
      percentile = Math.min(100, Math.round(100 - rawPercentile));
    }

    res.json({
      totalInterviews,
      upcomingInterviews,
      averageScore,
      percentile, // e.g., 18 means "Top 18%"
    });
  } catch (error) {
    console.error("Error in getStats:", error);
    res.status(500).json({ error: "Failed to fetch interview stats" });
  }
};

// ============================================================
// 2. GET /api/interviews/upcoming
// ============================================================
export const getUpcoming = async (req, res) => {
  try {
    const userId = req.user.id;
    const now = new Date();

    const interviews = await prisma.interview.findMany({
      where: {
        application: { userId },
        scheduledDate: { gt: now },
      },
      include: {
        application: true,
      },
      orderBy: { scheduledDate: "asc" },
    });

    res.json(interviews);
  } catch (error) {
    console.error("Error in getUpcoming:", error);
    res.status(500).json({ error: "Failed to fetch upcoming interviews" });
  }
};

// ============================================================
// 3. GET /api/interviews/past
// ============================================================
export const getPast = async (req, res) => {
  try {
    const userId = req.user.id;
    const now = new Date();

    const interviews = await prisma.interview.findMany({
      where: {
        application: { userId },
        scheduledDate: { lt: now },
      },
      include: {
        application: true,
      },
      orderBy: { scheduledDate: "desc" },
    });

    res.json(interviews);
  } catch (error) {
    console.error("Error in getPast:", error);
    res.status(500).json({ error: "Failed to fetch past interviews" });
  }
};

// ============================================================
// 4. GET /api/interviews/past/:id
// ============================================================
export const getOne = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const interview = await prisma.interview.findFirst({
      where: {
        id: Number(id),
        application: { userId }, // SECURITY: ensures user owns this interview
      },
      include: {
        // application: true,
      },
    });

    if (!interview) {
      return res
        .status(404)
        .json({ error: "Interview not found or unauthorized" });
    }

    res.json(interview);
  } catch (error) {
    console.error("Error in getOne:", error);
    res.status(500).json({ error: "Failed to fetch interview details" });
  }
};

// ============================================================
// 4. UPDATE /api/interviews/past/:id
// ============================================================
export const update = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const updateData = req.body;

    // 1. Check ownership
    const interview = await prisma.interview.findFirst({
      where: {
        id: Number(id),
        application: {
          userId,
        },
      },
    });

    if (!interview) {
      return res.status(404).json({
        error: "Interview not found or unauthorized",
      });
    }

    const updatedInterview = await prisma.interview.update({
      where: {
        id: Number(id),
      },
      data: updateData,
    });

    return res.json(updatedInterview);
  } catch (error) {
    console.error("Error updating interview:", error);
    return res.status(500).json({
      error: "Failed to update interview",
    });
  }
};

// ============================================================
// 5. POST /api/interviews
// ============================================================

export const create = async (req, res) => {
  try {
    const userId = req.user.id;
    const {
      applicationId,
      stage,
      scheduledDate,
      interviewer,
      duration,
      prepLink,
      notes,
    } = req.body;

    if (!applicationId || !stage || !scheduledDate) {
      return res.status(400).json({
        error: "Missing required fields",
      });
    }

    const applicationIdNum = Number(applicationId);

    const application = await prisma.job.findFirst({
      where: { id: applicationIdNum, userId },
    });

    if (!application) {
      return res.status(404).json({
        error: "Application not found or unauthorized",
      });
    }
    const interview = await prisma.interview.create({
      data: {
        applicationId: applicationIdNum,
        stage,
        scheduledDate,
        interviewer: interviewer || null,
        duration: duration ? Number(duration) : null,
        prepLink: prepLink || null,
        notes: notes || null,
        result: "Pending",
      },
      include: {
        application: true,
      },
    });

    await prisma.job.updateMany({
      where: {
        id: applicationIdNum,
        status: { not: "interview" },
      },
      data: {
        status: "interview",
      },
    });

    return res.status(201).json(interview);
  } catch (error) {
    if (error.code === "P2002") {
      return res.status(400).json({
        error: "Interview already exists for this stage",
      });
    }
    console.error(error);
    return res.status(500).json({ error: "Failed to create interview" });
  }
};
