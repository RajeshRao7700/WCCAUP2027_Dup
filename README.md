# Welcome to your Lovable project

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Open your project in the [Lovable editor](https://lovable.dev) and keep building.

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: connect the project to GitHub and every change made in Lovable is committed straight to your repository.
- **Full ownership**: this code is yours. Push to your repository and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

## Built with

- TanStack Start
- TypeScript
- React
- Tailwind CSS

## Backend Integration (WCCAUP2027 public website)

This project is the **public** conference frontend only. It contains no admin
panel, no admin authentication and no payment provider secrets.

1. Set `VITE_USE_MOCK_DATA=false` to switch from the local mock data layer to
   the real API.
2. Set `VITE_API_BASE_URL` to the Spring Boot base URL (no trailing slash).
3. Set `VITE_CONFERENCE_SHORT_NAME=WCCAUP2027`. This is frontend configuration
   only — tenant authorization stays a backend responsibility.
4. Configure CORS on the Spring Boot backend to allow the WCCAUP2027 domain. The
   frontend never uses proxies or CORS workarounds.
5. Provide public read-only endpoints matching `src/api/axiosClient.ts`
   (`endpoints`): conference, about, tracks, important-dates, speakers,
   committee, workshop-banners, sponsors, media-partners, attendees-from,
   files, updates, program, venue, accommodation.
6. Provide the public registration endpoint (`POST /api/public/registrations`)
   returning `registrationNumber`, `email`, `paymentStatus` and optionally
   `paymentLink`.
7. Provide the public abstract endpoint (`POST /api/public/abstracts`)
   returning `abstractNumber` and `submissionStatus`.
8. Return absolute file URLs from the files endpoint; raw filesystem paths are
   never used by the website.

Responses may use `snake_case`; conversion to camelCase happens once in
`src/api/adapter.ts`. Mock and live implementations return the same TypeScript
interfaces defined in `src/types/conference.ts`.
