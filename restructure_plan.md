# Frontend Restructuring Plan

## 1. Directory Structure

Create the following directory structure:

```
jobcity/
├── pages/
│   ├── auth/
│   ├── home/
│   └── more/
├── src/
│   ├── components/
│   │   ├── auth/
│   │   ├── home/
│   │   ├── more/
│   │   └── common/
│   ├── layouts/
│   └── styles/
└── public/
```

## 2. File Changes and Creations

### Pages

1. Move `pages/index.js` to `pages/home/index.js`
2. Create new files:
   - `pages/index.js` (main router)
   - `pages/auth/login.js`
   - `pages/auth/register.js`
   - `pages/more/about.js`
   - `pages/more/contact.js`

### Components

Create the following component files:
1. `src/components/auth/LoginForm.js`
2. `src/components/auth/RegisterForm.js`
3. `src/components/home/JobList.js`
4. `src/components/more/AboutContent.js`
5. `src/components/more/ContactForm.js`
6. `src/components/common/Header.js`
7. `src/components/common/Footer.js`

### Layouts

Create layout components:
1. `src/layouts/MainLayout.js`
2. `src/layouts/AuthLayout.js`

### Styles

1. Keep `src/styles/globals.css`
2. Create new style files:
   - `src/styles/auth.css`
   - `src/styles/home.css`
   - `src/styles/more.css`

## 3. Component and Page Content

### Pages

1. `pages/index.js`: Implement basic routing logic
2. `pages/home/index.js`: Display job listings and search functionality
3. `pages/auth/login.js` and `pages/auth/register.js`: Render respective auth forms
4. `pages/more/about.js`: Display information about Job-City
5. `pages/more/contact.js`: Render contact form

### Components

1. `LoginForm.js` and `RegisterForm.js`: Create forms with email/password fields
2. `JobList.js`: Display a list of job postings
3. `AboutContent.js`: Contain information about Job-City
4. `ContactForm.js`: Create a contact form
5. `Header.js`: Implement navigation menu
6. `Footer.js`: Create a footer with links and copyright info

### Layouts

1. `MainLayout.js`: Wrap non-auth pages with header and footer
2. `AuthLayout.js`: Provide a minimal layout for auth pages

## 4. Additional Tasks

1. Update `package.json`:
   - Add `react-router-dom` for client-side routing
   - Include `formik` and `yup` for form handling and validation
2. Implement basic state management using React Context or Redux
3. Set up API integration structure in `src/api/` directory
4. Create a `src/utils/` directory for helper functions and constants

## 5. Next Steps

After implementing this structure:
1. Refactor existing code to fit the new structure
2. Implement proper routing using `react-router-dom`
3. Create placeholder content for all pages and components
4. Set up a basic API integration structure
5. Implement form validation and handling using Formik and Yup
