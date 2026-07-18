import { Grid } from "@mui/material";

const JobStates = ({ summaryStats }) => {
  return (
    <Grid container spacing={2} className="mb-2">
      {summaryStats.map((s) => {
        const Icon = s.icon;
        return (
          <Grid key={s.label} size={{ xs: 6, md: 3 }}>
            <div className="glass-card rounded-xl p-4 flex items-center gap-3">
              <div
                className={`w-9 h-9 rounded-xl ${s.bg} flex items-center justify-center shrink-0`}
              >
                <Icon className={`w-4 h-4 ${s.color}`} />
              </div>
              <div>
                <p className="text-white text-xl font-black">{s.value}</p>
                <p className="text-[var(--color-text-secondary)] text-xs">{s.label}</p>
              </div>
            </div>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default JobStates;
