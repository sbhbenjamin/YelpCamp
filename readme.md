# YelpCamp

## 1. Basics

### Initial Routes

- Setup (Express, EJS)
- Add Landing Page ("/")
- Add Campgrounds Page that lists all campgrounds (*"/campgrounds"*)
    - Each Campground is an object that has:
        - Name
        - Image

### Layout

- Create header and footer partials and include them
- Add in Bootstrap

### Creating New Campgrounds

- Setup new campground POST route (*"/campgrounds"*)
    - Get data from form and add to campground
    - Redirect back to campground
- Add in body parser
- Setup route to show form (*"/campgrounds/new"*)
- Add basic form
- Move campground array to global so that new campground route can access it

### Style the Campgrounds page

- Add a better header/title
- Make campgrounds display in a grid

### Styling Nav and forms

- Add a navbar to all templates
- Style the new campground form

## 2. Data Persistence

### Add Mongoose

- Install and configure mongoose
- Setup campground model
- Use campground routes inside our routes

### Show Page

- Add the description to our campground model
- Show db.collection.drop()
- Add a show route/template

## 3. Comments

### Refactor Mongoose Code

- Create a models directory
- Use module.exports
- Require everything correctly

### Add a Seeds File

A Seeds file grants us some sample data for testing of functionalities

- Add a seeds.js file
- Run the seeds file every time the server starts

### Add the Comments model

- Create models/comment.js
- Display comments on every campground show page

### Comment New / Create

- Nested Routes
    The comment route should not exist standalone (i.e. comments/new) as they depend on the campground and the particular id. As such, we have to nest the comments within the campgrounds path:
- Moved EJS files to campground and comment directories, and updated partials to reflect correct directory
- Add the comment new and create routes
- Add the new comment form

### Style Show Page

- Add a sidebar to show page
- Display comments nicely
- Make a new stylesheet public/stylesheets/main.css
    - Serve the public directory in app.js (__dirname)
    - Link to the stylesheet in header.ejs

## 4. Adding Authentication

### Add User Model

- Install all packages needed for authentication
- Define User model

### Register

- Configure Passport
- Add register routes
- Add register template

### Login

- Add login routes
- Add login template

### Logout / Navbar

- Add logout route
- Prevent user from adding a comment if not signed in
- Add links to navbar

## Show / Hide Links

- Show/hide auth links correctly
- Using **req.user**

## 5. Cleaning up

### Refactoring Routes

- Use the Express router to reorganise all routes

### User + Comments

- Associate users and comments by adding author as an object in the comment schema
- Save author's name to a comment automatically via comment.js

### Users + Campgrounds

- Prevent an unauthenticated user from creating a campground using middleware
- Save username + id to newly created campground

## 6. Update and Destroy

### Editing Campgrounds

- Add Method-Override
- Add Edit Route for Campgrounds
- Add Link to Edit Page
- Add Update Route

### Deleting Campgrounds

- Add Destroy Route
- Add Delete Button

### Authorisation

- User can only edit his/her campgrounds
- User can only delete his/her campgrounds
- Hide/Show edit and delete buttons

### Editing Comments

- Add Edit route for comments
- Add Edit button
- Add Update Route

### Deleting Comments

- Add Destroy route
- Add Delete Button

### Authorisation (Comments)

- User can only edit his/her comments
- User can only delete his/her comments
- Hide/Show edit and delete buttons
- Refactor Middleware

### Adding in Flash

- Install and configure connect-flash

        // middleware/index.js
        middlewareObj.isLoggedIn = function(req, res, next){
        	if (req.isAuthenticated()){
        		return next();
        	}	
        	**req.flash("error", "Please login first")**
        	res.redirect("/login")
        }

- Add bootstrap alerts to header

### Landing Page Refactor

- Adding styles into CSS to enable slideshow functionality with fading effects

### Dynamic pricing

- Altering the show page and edit/new forms, campgrounds route and campgrounds model
