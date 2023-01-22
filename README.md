# Griot

Griot is a book review application where you can create and view reviews for previously read books. These reviews can be shared on a public page with other users.

## How It's Made:

**Tech used:** Express, MongoDB, Google OAuth 2.0, Handlebars

Using Google OAuth 2.0 users can log in with their Google accounts. The user data is saved in the MongoDB database and is used to create express sessions, a personal dashboard, and a platform to share reviews with the ability to look at a user's public reviews. Users have an option to create private stories as well that are only visible on their personal dashboards.

## Future Optimizations:

- Add genres to book models so that categories can exist within the public sharing space
- Add filtering by title, author, genre, and review rating so users can easily view organized data
- Layout changes to the user profile pages so that it is differentiated from the public review page + (maybe an api/tool that can add images to book covers)