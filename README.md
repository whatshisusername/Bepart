# Bepart  

Bepart is an innovative web application designed to connect individuals with meaningful events like beach cleanups, marathons, and small runs. It empowers users to discover and participate in local initiatives or host their own events, fostering community engagement and contribution.  

---

## Tech Stack  

- **Frontend**: `React.js`  
- **Backend**: `Express.js`  
- **Database**: `MongoDB`  
- **Authentication**: `Google OAuth`  
  - Seamless user authentication and session management using JWT.  
- **Location Services**:  
  - `Foursquare API` for precise location autocomplete.  
- **Debouncing**:  
  - Optimized API performance by implementing debouncing to minimize calls triggered by rapid keystrokes.  
- **AI Description Generation**:  
  - Integrated AI to generate compelling event descriptions.  

---

## Features  

### For Users  

#### **Profile Management**  
- Sign up and log in using Google OAuth for a seamless experience.  
- Secure session management with JWT.  

#### **Event Discovery**  
- Browse all events with filters for today, past, or upcoming events.  
- View event details, including location, description, and timing.  

#### **Event Hosting**  
- Host events by signing up on the platform.  
- Add events with AI-generated descriptions for convenience.  
- Utilize location autocomplete for precise event locations using the Foursquare API.  
- Delete events hosted by the user.  

---

## Key Practices and Implementation Details  

1. **Authentication and Authorization**  
   - Google OAuth for user authentication.  
   - JWT for secure token-based session management.  

2. **Location Autocomplete**  
   - Integrated Foursquare API for precise event location selection.  
   - Debouncing technique reduces redundant API calls, improving performance.  

3. **Environment Variables**  
   - Sensitive information (e.g., API keys, database credentials) is securely stored in an `.env` file.  

4. **Scalable Backend Architecture**  
   - Cleanly structured codebase with controllers, models, routes, and middlewares for maintainability and scalability.  

5. **AI Description Generation**  
   - Events added by users are automatically enriched with AI-generated descriptions, simplifying the hosting process.  

---

## Screenshots  

### Homepage  


![homeb](https://github.com/user-attachments/assets/891775d8-a562-4239-a37e-8441bd4d3cd0)
![homeinb](https://github.com/user-attachments/assets/f4a1a236-8bf0-462e-85ba-2afb42dc5c4a)
![signinb](https://github.com/user-attachments/assets/0f39877e-94f7-443a-917d-81b9f120ca94)

### Event Discovery  
 ![eventb](https://github.com/user-attachments/assets/ec2fab2a-3b23-4dff-83bc-6d77930d505b)
![eventdb](https://github.com/user-attachments/assets/0c790bb6-b585-4cf6-9aef-939b4388034a)
![rundb](https://github.com/user-attachments/assets/8fb673fb-5366-4885-9758-64e3e0ea3ac9)
![rund](https://github.com/user-attachments/assets/b57b43a2-42ac-431a-b0ca-ed091800aab6)



### Event Hosting  
![addeventb](https://github.com/user-attachments/assets/c53e6a8c-cc49-42d0-ae5d-c7cc985bbda4)


---

## Deployed Web App  

Visit the live application here(open with MicrosoftEdge): [Bepart Web App](https://beach-cleanup-deploy.vercel.app/)  

---
