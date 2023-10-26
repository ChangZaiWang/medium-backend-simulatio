# medium-backend-simulation
### 2021 DLab Backend Development Workshop with NodeJS
* Design REST like API
* Project structure:
```
├── app.js
├── src
│   ├── controllers
│   │   ├── bookmark.controller.js
│   │   ├── clap.controller.js
│   │   ├── comment.controller.js
│   │   ├── follow.controller.js
│   │   ├── story.controller.js
│   │   └── user.controller.js
│   ├── db
│   │   ├── create-db-bookmark.sql
│   │   ├── create-db-comment.sql
│   │   ├── create-db-story.sql
│   │   ├── create-db-user.sql
│   │   ├── create-pivot-bookmark.sql
│   │   ├── create-pivot-clap.sql
│   │   ├── create-pivot-follow.sql
│   │   └── db-connection.js
│   ├── middleware
│   │   ├── auth.middleware.js
│   │   ├── awaitHandlerFactory.middleware.js
│   │   ├── error.middleware.js
│   │   └── validators
│   │       ├── bookmarkValidator.middleware.js
│   │       ├── clapValidator.middleware.js
│   │       ├── commentValidator.middleware.js
│   │       ├── storyValidator.middleware.js
│   │       └── userValidator.middleware.js
│   ├── models
│   │   ├── bookmark.model.js
│   │   ├── clap.model.js
│   │   ├── comment.model.js
│   │   ├── follow.model.js
│   │   ├── story.model.js
│   │   └── user.model.js
│   ├── routes
│   │   ├── bookmark.route.js
│   │   ├── clap.route.js
│   │   ├── comment.route.js
│   │   ├── follow.route.js
│   │   ├── story.route.js
│   │   └── user.route.js
│   └── utils
│       ├── HttpException.utils.js
│       ├── clapType.utils.js
│       ├── common.utils.js
│       └── userRoles.utils.js
```
