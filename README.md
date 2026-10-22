PROJECT BRIEF: TRANSFORM SMARTNEST INTO A FULLY FUNCTIONAL WEB APPLICATION

1. Project Overview

I have an existing project called SmartNest, currently hosted at:

https://smartnest-3bz4.netlify.app/

SmartNest is a smart-home planning and guidance platform. The existing website is primarily a static frontend built with HTML, CSS, and JavaScript. It contains smart-home educational content, installation guides, security and privacy information, troubleshooting resources, device guidance, and a smart-home planner.

I want you to transform this existing project into a modern, responsive, full-stack web application suitable for a final-year BCA college project and a Shark Tank-style business presentation.

This is not a request to redesign the homepage alone. I need a working application with authentication, persistent data, user-specific dashboards, interactive functionality, an administrator/support dashboard, and a complete issue-tracking workflow.

Preserve and improve the existing SmartNest identity and useful content. Do not discard the existing project and create an unrelated website.

2. Product Vision

SmartNest should help people plan, organize, maintain, and troubleshoot their smart homes from one platform.

Tagline: SmartNest — Smart Living, Simplified.

The application should focus on four core capabilities:

1. Personalized smart-home planning.
2. Personal device and home management.
3. SmartNest Care: issue reporting and status tracking.
4. Educational resources, installation guidance, and troubleshooting.

The application should feel like a genuine startup product, not a basic college CRUD project.

3. Technology Requirements

Review the existing source code before deciding on the implementation.

Preferred technology stack:

- Frontend: React with TypeScript, or another suitable modern framework if the existing codebase makes that more practical.
- Styling: Tailwind CSS or a similarly maintainable styling system.
- Backend and database: Supabase.
- Authentication: Supabase Auth.
- Database: PostgreSQL through Supabase.
- File uploads: Supabase Storage for issue photos, with appropriate access controls.
- Hosting: Netlify for the frontend, with secure environment-variable configuration.

You may retain the existing HTML, CSS, and JavaScript architecture if migrating it would introduce unnecessary risk or delay. Explain the recommended approach before undertaking a major rewrite.

Never expose secret keys or privileged database credentials in client-side code.

4. User Authentication and Roles

Implement working authentication.

Required functionality:

- User registration.
- Login and logout.
- Password reset.
- Appropriate validation and error messages.
- Persistent sessions.
- Protected application routes.
- User-specific information after login.

Create two roles:

A. Customer/User

- Access and manage their own home.
- Add and manage their devices.
- Create and save home plans.
- Submit support tickets.
- Track ticket updates.
- Read educational resources.

B. Administrator/Support Staff

- Access a separate protected dashboard.
- View and manage support tickets.
- Update ticket statuses.
- Add support responses and internal notes.
- View relevant ticket history.
- Manage the curated device catalogue.

Do not allow users to select an administrator role during ordinary registration. Administrative access must be granted securely.

5. User Dashboard — My SmartNest

Build a personalized dashboard that displays:

- Welcome message and user profile.
- Number of registered devices.
- Number of saved home plans.
- Open support tickets.
- Recently updated tickets.
- Warranty or maintenance reminders, when configured.
- Quick actions for adding devices, creating plans, and reporting problems.

The dashboard must use actual saved database records, not hardcoded numbers presented as live data.

Provide polished loading, empty, success, and error states.

6. My Home and Device Management

Users must be able to manage their homes and registered devices.

Required functionality:

- Create and edit a home.
- Add rooms.
- Add devices to specific rooms.
- Edit device details.
- Remove devices.
- View device details and associated support tickets.
- Record brand, model, category, room, purchase date, warranty expiry, and notes where applicable.
- Link devices to relevant manuals and setup guides.
- Display warranty and maintenance reminders.

Use a curated device catalogue with sample products for the demonstration.

Device availability, compatibility, prices, and specifications must not be invented or represented as verified facts. Use sourced product information and clearly identify sample or unverified data.

Do not claim that the application can control real devices or detect live device status unless those integrations are actually implemented.

7. SmartNest Planner — Core Feature

This should be one of the most impressive features of the application.

Build a genuinely interactive planner that asks users for:

- Home type, such as apartment or independent house.
- Number of rooms.
- Approximate budget in INR.
- Main goals: security, convenience, energy saving, or automation.
- Existing devices.
- Preferred device categories.
- Relevant connectivity or ecosystem requirements, where known.

After submission, generate a personalized smart-home plan.

The results page should include:

- Recommended device categories and selected catalogue products.
- Product names, prices, and sources where verified.
- Estimated cost per item.
- Total estimated budget.
- Budget remaining.
- Category-wise cost breakdown.
- Reasons for the recommendations.
- Relevant installation and security guides.
- Compatibility warnings where applicable.

The planner must enforce the user's budget or clearly explain when the requested setup cannot fit within it.

Users should be able to save, reopen, edit, and delete their plans.

Where appropriate, allow users to add selected devices from a saved plan to My Home.

Use transparent, rule-based recommendation logic initially. Do not pretend the system uses AI or machine learning unless that functionality is actually developed.

8. SmartNest Care — Issue Reporting and Tracking

This is a critical feature and must work end to end.

Users should be able to report problems with registered devices.

The issue submission form must include:

- Automatically generated unique ticket ID.
- Associated device and room, where applicable.
- Issue category.
- Short title.
- Detailed description.
- Priority selection.
- Optional photo attachment.
- Submission date and time.

Example issue categories:

- Device offline.
- Connectivity problem.
- Installation assistance.
- Automation not working.
- Device malfunction.
- Security or privacy concern.
- Other.

Each ticket must have a lifecycle:

1. Submitted.
2. Under Review.
3. In Progress.
4. Resolved.
5. Closed, where appropriate.

The support dashboard must allow authorized staff to update a ticket's status and add an update message.

Every update must be stored in the database with its timestamp and author.

Users must be able to open a ticket and see:

- Current status.
- Ticket ID.
- Issue details.
- Submission time.
- Complete chronological status timeline.
- Support responses.
- Resolution notes.
- Option to confirm resolution or provide feedback.

When support staff update a ticket, the customer should see the new status and update history without manually editing their own record. Use appropriate refresh or real-time updates.

Ticket status changes must be validated and recorded consistently.

Use a clear visual timeline with status indicators and timestamps.

For the college demonstration, the support team may be simulated by an authorized administrator account. Do not imply that real technicians or actual repairs are available unless that service has been established.

9. Administrator and Support Dashboard

Create a separate administrator interface with:

- Overview of total tickets.
- Open, under-review, in-progress, and resolved ticket counts.
- Ticket search and filtering.
- Ticket details and customer-submitted descriptions.
- Status update controls.
- Support response field.
- Assignment to a support person, if implemented.
- Ticket history.
- Device catalogue management.

Every administrative action must be authorized by the backend/database security rules, not merely hidden in the frontend.

A customer must never be able to access another customer's home, devices, private photos, or tickets by changing a URL or database identifier.

10. Learn and Support — Reuse the Existing Website

Preserve and improve the existing SmartNest educational content.

Organize the content into:

- Smart Home Basics.
- Device Guides.
- Installation and Setup.
- Security and Privacy.
- Troubleshooting.
- Automation Ideas.
- Frequently Asked Questions.

Add search and useful cross-links.

For example, a user viewing a smart-camera device should be able to access its relevant installation, privacy, and troubleshooting guides.

Do not remove valuable existing content without first reviewing it.

11. Device Passport and Reminders

Provide a device details page that includes:

- Device information.
- Purchase date.
- Warranty expiry.
- Manuals.
- Maintenance notes.
- Related support tickets.

Display reminders for approaching warranty expiry or configured maintenance dates.

For the first version, reminders can appear inside the application. Email, SMS, or push notifications should only be included if properly implemented.

12. UI/UX and Visual Quality

The design must look like a professional, contemporary SaaS startup product.

Design requirements:

- Responsive desktop, tablet, and mobile layouts.
- Consistent SmartNest branding.
- Clean navigation and clear page hierarchy.
- Modern dashboard cards and tables.
- Well-designed forms, modals, and confirmation dialogs.
- Clear visual status indicators.
- Consistent spacing, typography, icons, and buttons.
- Accessible color contrast and keyboard-friendly interactions.
- Helpful empty states and error messages.
- Toast notifications or equivalent feedback for successful actions.
- No broken layouts or horizontal overflow on mobile.
- No excessive gradients, unnecessary animations, or cluttered dashboards.

The homepage should communicate the customer problem, explain SmartNest's solution, highlight key features, and provide a clear call to action.

Use realistic, professional sample data rather than generic filler text.

Do not use decorative buttons that do nothing. Every visible interactive control must work or be clearly labelled as a future feature.

13. Database Design

Design a normalized and maintainable database.

Suggested entities:

- profiles
- homes
- rooms
- device_catalog
- user_devices
- home_plans
- plan_items
- support_tickets
- ticket_updates
- maintenance_reminders
- user_feedback

Add appropriate primary keys, foreign keys, timestamps, constraints, and indexes.

Use Row Level Security (RLS) and suitable database policies to enforce user-level access.

Ensure that:

- Customers can access only their own private records.
- Authorized support staff can access tickets according to their role.
- Only authorized administrators can modify catalogue data and roles.
- Private uploaded files are protected.
- Role assignments cannot be self-modified by ordinary users.

Provide database migrations or SQL setup scripts and clear setup documentation.

14. Business Readiness

SmartNest is intended to be demonstrated as a potential business.

Design the application to support these potential revenue streams:

1. Premium personalized home-planning services.
2. Installation coordination through external service partners.
3. Disclosed referral commissions from participating retailers.
4. Optional premium troubleshooting or support services.

These are proposed business models, not existing revenue.

Do not implement real payment processing unless agreed separately. If a payment demonstration is included, clearly label it as a sandbox or demo.

The application should support future expansion without pretending that partnerships, bookings, revenue, or device integrations already exist.

15. Demo Data and Presentation Mode

Prepare a professional demonstration environment.

Include clearly labelled sample data for:

- One sample home with multiple rooms.
- Several sample devices.
- At least two saved home plans.
- Multiple support tickets in different stages.
- Ticket update histories.
- Warranty or maintenance reminders.

Provide a safe, repeatable demonstration workflow:

1. Log in as a demo customer.
2. View their dashboard.
3. Create or open a home plan.
4. View their registered devices.
5. Submit a sample device issue.
6. Log in separately as an authorized support administrator.
7. Change the ticket status and add a support update.
8. Return to the customer account and demonstrate the updated timeline.

Do not seed sample records into real customer accounts. Make demo data easy to reset.

16. Testing and Quality Assurance

Test the application end to end.

At minimum, verify:

- Registration, login, logout, and password reset.
- Protected pages and role permissions.
- Creating and editing homes and devices.
- Saving and reopening home plans.
- Budget calculations.
- Ticket creation and unique IDs.
- Ticket status changes and chronological updates.
- File-upload validation and access controls.
- Customer data isolation.
- Unauthorized administrator access.
- Mobile responsiveness.
- Form validation and failure handling.
- Database persistence after logout and login.
- Deployment configuration and production build.

Fix errors rather than simply documenting them.

17. Required Deliverables

I expect the following:

1. Complete working source code.
2. Functional deployed application.
3. Configured database and authentication.
4. SQL migrations or setup scripts.
5. Secure environment-variable instructions.
6. Sample demonstration accounts and setup instructions, created safely.
7. README with installation, configuration, deployment, and testing steps.
8. List of implemented features and any limitations.
9. Screenshots of the major application pages.
10. A short demo script showing the complete customer-to-support workflow.

Deploy the application to Netlify or another agreed platform and provide the final working URL.

Do not declare the project complete until the core workflows work in the deployed environment, not just on a local development server.

18. Implementation Priorities

Develop in the following order:

Phase 1: Inspect the existing project, preserve the content, establish the architecture and implement authentication and database access.

Phase 2: Implement My SmartNest, homes, rooms, devices and saved plans.

Phase 3: Implement SmartNest Care, including ticket creation, status history, support responses and the administrator dashboard.

Phase 4: Complete the personalized planner and connect it to saved devices and educational guides.

Phase 5: Add Device Passport, reminders, feedback and UI polish.

Phase 6: Test security, fix bugs, deploy, and prepare the demonstration environment.

Prioritize a fully working core product over adding too many unfinished features.

19. Before You Start

First inspect the existing SmartNest website and source code.

Then provide:

- A brief assessment of the existing project.
- The recommended architecture.
- A list of existing pages and features you can preserve.
- The implementation plan and estimated timeline.
- Any technical limitations or additional access required.

Do not make irreversible changes or discard the current source code without approval.

Final goal: Deliver SmartNest as a professional, functional smart-home management and support web application that we can demonstrate live to college faculty and a simulated panel of investors. The product must be honest about what is implemented, technically sound, visually polished, and realistic enough to explain as an early-stage startup.