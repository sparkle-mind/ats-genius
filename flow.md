## File Upload to Cloudinary (Express + Multer) >>>>>>>>>>>>>>>>


    ⭐ Step 1 : User selects file in frontend

    ⭐ Step 2: Frontend sends file using FormData

    ⭐ Step 3: Express receives file via multer

    ⭐ Step 4: File is temporarily stored in memory (or disk)

    ⭐ Step 5: Server uploads file to Cloudinary

    ⭐ Step 6: Cloudinary returns a hosted URL

    ⭐ Step 7: You send that URL back to frontend or save in DB

## Mail (Nodemailer) / SMTP >>>>>>>>>>>>>>>>

    ⭐Step 1: User requests password reset

    ⭐Step 2: Server generates a unique token

    ⭐Step 3: Token is stored in database with user

    ⭐Step 4: Email sent with reset link containing the token

    ⭐Step 5: User clicks link → frontend displays reset form

    ⭐Step 6: User submits new password

    ⭐Step 7: Server verifies token → hashes password → updates user
    
    ⭐Step 8: Send confirmation email → done

## CryptoGraphy,Hashing and Encryption >>>>>>>>>

    👉🏼 bcrypt hash>>> for password  - Cannot get original data back. / One-way process.

    👉🏼 jwt token>>> for session

    👉🏼 Encryption >>> Used when you need the original data later. / Two-way process.

    👉🏼 crypto >>> for encryption, decryption & Generate Random tokens (not for password hashing)

  
## Which Tool Should I Use?

| Scenario                 | Recommended Tool   |
| ------------------------ | ------------------ |
| User password            | bcrypt             |
| Login verification       | bcrypt.compare     |
| Email verification token | crypto.randomBytes |
| Password reset token     | crypto.randomBytes |
| Sensitive data storage   | AES Encryption     |
| API secrets              | AES Encryption     |
| Authentication           | JWT                |
| File integrity           | SHA256             |


## Express.js authentication flow >>>>>>>>>

        Signup
          ↓
        bcrypt.hash(password)
          ↓
        Store hash in DB

        Login
          ↓
        bcrypt.compare(password, hash)
          ↓
        Create JWT
          ↓
        Send token to client

        Protected Route
         ↓
        Verify JWT
         ↓
        Allow access

## GOOGLE authentication flow >>>>>>>>>
    User Clicks Google Button
              │
              ▼
    Google Popup Opens
              │
              ▼
    User Selects Google Account
              │
              ▼
    Google Returns JWT Credential Token
              │
              ▼
    Frontend Sends Token To Backend
              │
              ▼
    Backend Verifies Token With Google
              │
              ▼
    Extract User Information
    (email, name, googleId)
              │
              ▼
    Check User Exists?
        ┌─────────────┐
        │             │
        YES           NO
        │             │
        ▼             ▼
    Login User    Create User
        │             │
        └──────┬──────┘
                ▼
    Generate JWT Tokens
                │
                ▼
    Save Refresh Token
                │
                ▼
    Set Cookies
                │
                ▼
    Return Success Response

<!-- ## GEMINI API FOR ATS (this is not work currently )>>>>>>>>> -->

<!-- https://aistudio.google.com/

npm install @google/genai -->


## OPENROUTER API FOR ATS (this is work currently )>>>>>>>>>

npm install openai
<!-- https://openrouter.ai -->

https://openrouter.ai/workspaces?utm_source=signup-success
