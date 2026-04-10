
# SurpreSaFeel Travels — Complete Website Plan

## Overview
A 5-page emotion-based travel planning website for a Philippine startup targeting Filipino Millennials and Gen Z. Warm, inviting design with golden yellow, teal, and coral accents.

## Design System
- **Colors**: Primary #F5A623, Secondary #1A6B6B, Accent #FF6B6B, Background #FAFAF8, Text #2D2D2D
- **Typography**: Playfair Display (headings), Inter (body) via Google Fonts
- **Style**: Soft shadows, rounded corners (12-16px), gentle gradients, mobile-first, minimal

## Global Components
1. **Navbar** — Sticky, logo left, nav links right, hamburger on mobile, golden "Take the Quiz" CTA button
2. **Footer** — Logo + tagline, nav links, social icons (Facebook, TikTok), contact info, copyright

## Pages

### 1. Home (`/`)
- **Hero**: Full-width gradient background, "Travel the Way You Feel" heading, two CTAs
- **What We Do**: 3 icon cards (Feel → Plan → Travel)
- **Sample Itineraries**: 6 trip cards in a responsive grid (Tagaytay, Batangas, Baguio, Cebu, Zambales, Vigan)
- **CTA Banner**: Golden-to-teal gradient with quiz link
- **Footer**

### 2. About (`/about`)
- **Our Story**: Company narrative + highlighted mission quote
- **Meet the Team**: 7 team member cards with placeholder avatars
- **Our Values**: 3 value cards (Emotion First, Personalized, Reliable)

### 3. Services (`/services`)
- **Heading section**
- **6 Mood Category Cards** with emoji, description, example destinations
- **Pricing Card**: ₱1,000 per itinerary with 6-item checklist
- **How It Works**: 3-step horizontal timeline

### 4. Questionnaire (`/questionnaire`)
- **5-step form** with progress bar and smooth transitions
  - Step 1: Personal info (name, email, phone)
  - Step 2: Mood selection (6 visual clickable cards)
  - Step 3: Travel details (destination type, month, days, group)
  - Step 4: Budget selection (4 clickable range cards)
  - Step 5: Additional notes + consent checkbox
- **Submit**: POST to placeholder URL, loading state, error handling
- **Success screen**: Personalized thank-you with name and email displayed

### 5. Contact (`/contact`)
- **Two-column layout**: Contact info cards (left) + simple contact form (right)
- Form shows success toast on submit (no backend)

## Technical Details
- React Router for all navigation
- Subtle fade-in page transitions
- Smooth scroll for "Learn More" on homepage
- Form validation with visual feedback
- Mobile-first responsive design throughout
- Google Fonts loaded for Playfair Display + Inter
