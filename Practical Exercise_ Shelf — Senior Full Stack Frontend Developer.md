# Practical Exercise: Shelf

**Senior Full Stack Frontend Developer — Ranium Systems**

---

## Before you start

Read this entire document before writing any code. It is short, and everything you need is in here. If any part of the deliverables list is unclear, ask before you begin rather than after you submit.

Incomplete submissions are the most common reason candidates do not move forward, and almost always because someone skipped a deliverable rather than because the code was weak.

---

## What this is

A small application you build on your own time. We use it to understand how you write code, how you make decisions, and how you explain both.

**Time limit: 4 hours.** We mean this. Stop at 4 hours, write down what you did not finish, and submit. We would rather see a small, well-built app with honest notes than a large one that took you a weekend. Nobody gets extra credit for spending longer, and we do check the commit history.

---

## The brief

Build **Shelf**, a book discovery app with three parts.

### 1\. Search

A page where a user types a book title or author and sees matching results. Each result shows the cover, title, author, and publication year.

### 2\. Detail

Clicking a result opens a detail page for that book at its own URL, showing a larger cover, the description, publisher, page count, and categories.

### 3\. Shortlist

A user can save books to a personal shortlist and remove them. The shortlist survives a page refresh. Show it wherever you think makes sense.

That is the whole brief. Anything not covered above is your call.

---

## The API

Use the Google Books API.

| Purpose | Endpoint |
| :---- | :---- |
| Search | `https://www.googleapis.com/books/v1/volumes?q={query}` |
| Volume detail | `https://www.googleapis.com/books/v1/volumes/{volumeId}` |
| Covers | Returned inside `volumeInfo.imageLinks` on each volume |

Docs: [https://developers.google.com/books/docs/v1/using](https://developers.google.com/books/docs/v1/using)

### You need your own API key

Requests for public data must carry an API key. Create a project in the Google Cloud Console, enable the Books API, and generate a key from the Credentials page. It is free and takes a few minutes. Please do not ask us for a key.

**Your key must not be exposed.** Your repository is public and your deployed app is public, so neither can leak it. Do not commit the key, and make sure it is not readable in the browser. Include a `.env.example` listing the variable name with no value, so we can run the project with our own key.

Restricting the key in the Cloud Console is a sensible precaution and takes a minute.

### Before you plan your data layer

Call these endpoints yourself and read what comes back. It is real data about real books, with all that implies. Assume nothing about the response shape until you have seen it.

---

## Required stack

| Framework | Nuxt 4 |
| :---- | :---- |
| Vue | Vue 3, Composition API, `<script setup>` |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Components | Storybook, covering at least two of your presentational components |
| Hosting | Vercel, Netlify, or Cloudflare Pages |

Define your colour and spacing tokens centrally rather than scattering arbitrary values through the markup.

**On Storybook:** if the Nuxt integration fights you, give it 30 minutes and no more. Note in your README what went wrong and move on. Knowing when to stop is part of the job, and we would rather see that judgement than watch you lose two hours to config.

---

## On AI tools

Use them. Claude Code, Cursor, Copilot, whatever you normally reach for. We build with these tools daily at Ranium and have no interest in pretending otherwise.

Two conditions.

First, note in your README where AI helped and where you overrode it or rewrote what it gave you.

Second, you will walk us through this code live on a call. Every decision in the repo needs to be one you can defend, including the ones you accepted from a model. Code you cannot explain will hurt you more than code you did not write.

---

## Deliverables

All four. A submission missing any one of these will not be reviewed.

### 1\. A public GitHub repository

Public, not private, and not a shared zip. We need to read the commit history, so please commit as you work rather than pushing everything at the end. Small, frequent commits with clear messages tell us more than a perfect final diff.

### 2\. A live URL

Deployed and reachable, with your API key configured on the hosting platform. We will use the app before we read the code.

### 3\. A README

Cover these:

- How to run it locally, including environment setup  
- Any assumptions you made, and why  
- Tradeoffs you accepted and what you would have done with more time  
- What is unfinished or broken, stated plainly  
- Where you used AI tooling

Write it for a teammate joining the project on Monday.

### 4\. A screen recording, 5 minutes maximum

Loom or similar, unlisted link is fine. Walk us through the app and then the code. Tell us what you would change first if this were going to production.

Do not script or edit it. We want to hear you think, not watch a polished demo. Talking through your own code is a core part of this role, and this is the closest we can get to that before we meet you.

---

## Questions

Reply to the email thread this document came from. Asking a good question before you start counts in your favour, not against you.

---

## What happens next

We review your submission, and shortlisted candidates get a 45-minute call. Half of that is a live code review exercise, and half is a small change request against the app you built here. No trivia, no algorithm puzzles.

Good luck. We are looking forward to seeing what you build.

