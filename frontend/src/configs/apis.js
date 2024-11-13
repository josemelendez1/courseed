export const APIS = Object.freeze({
    GET_USERS: "/api/users",
    GET_COURSES: "/api/courses",
    GET_COURSE: "/api/courses/course",
    GET_CATEGORIES: "/api/categories",
    GET_INSTITUTIONS: "/api/institutions",
    GET_RECENT_COURSES: "/api/courses/recent",
    GET_LIKED_COURSES: "/api/courses/liked",
    GET_LIKED_COURSES_AUTH: "/api/courses/likes/authenticated",
    USER_AUTHENTICATED: "/api/users/authenticated",
    GET_COMMENTS: "/api/comments",
    CREATE_COMMENTS: "/api/comments",
    UPDATE_COMMENTS: "/api/comments/update",
    UPDATE_PASSWORD: "/api/users/update-password",
    UPDATE_PASSWORD_ADMIN: "/api/users/change-password",
    UPDATE_ROLE: "/api/users/update-authority",
    DELETE_COMMENTS: "/api/comments/delete",
    LIKE_COURSE: "/api/courses/course/like",
    COURSES_BY_LIKES: "/api/courses/likes",
    INSTITUTIONS_BY_COURSES: "/api/institutions/courses",
    GET_REVIEWS: "/api/reviews",
    GET_REVIEWS_BY_COURSE: "/api/reviews/course",
    GET_REVIEW_BY_AUTH: "/api/reviews/course/auth",
    CREATE_REVIEW: "/api/reviews/create",
    UPDATE_REVIEW: "/api/reviews/update",
    DELETE_REVIEW: "/api/reviews/delete",
});