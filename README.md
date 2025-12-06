# WadesWineWatcher

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.0.4.

Link to Site: https://dw42csce.github.io/Wade-s-Wine-Watcher/

Use **user1** and **password1**  to have a look around, or create your own account if you'd like.

Database is set to sleep after inactivity for cost purposes, so a delay may be seen if logging in or signing up. Wait 3-5 minutes after initial login attempt and try again, the database will be awake by that time. If an issue persists, message me on LinkedIn at www.linkedin.com/in/dallas-wade

App Tech Stack:
Angular
C# ASP.NET
RESTfulAPI
Azure SQL Database

**A Brief Overview**

**1. Logging in**
  - Log in with the default account above OR create your own account using signup
  - If given message about the database being stateless, wait 3-5 minutes and try again

**2. The Wine Dashboard**
  - Each card on the screen shows a details about the wines being tracked:
    + Target ABV: The alcohol by volume the wine should reach based on initial and target specific gravity
    + Start Date: The date given for the start of the wine
    + 4 Bottles: Each of these represents a 30 day racking period, bottles fill as the racking period progresses
    + 3 Arrows: These indicate when to rack a wine, a greyed out arrow is not ready, a black arrow is complete, and a purple arrow is ready to be racked.

**3. Adding a New Wine**
  - Click Add New Wine on your dashboard
  - Wine Name: Name of the Wine
  - Wine Description: Description of the Wine
  - Start Date: The date when the yeast was added to begin fermentation
  - Wine Start Specific Gravity: The hydrometer-measured specific gravity of the wine immediately after mixing
  - Wine End Specific Gravity: The intended target specific gravity
  - Ingredients: A list of ingredients of the wine.

**Upcoming Features**
  - Tracking events, such as racking, tasting, etc
  - Specific Gravity calculation based on ingredient list    
