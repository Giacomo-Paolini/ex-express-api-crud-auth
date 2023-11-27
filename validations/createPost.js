module.exports = {
    title: {
        in: ['body'],
        notEmpty: {
            errorMessage: 'Title is required'
        }
    },
    slug: {
        in: ['body'],
        notEmpty: {
            errorMessage: 'Slug is required',
            length: {
                options: { min: 3 }
            }
        }
    },
    image: {
        in: ['body'],
        notEmpty: {
            errorMessage: 'Image is required'
        }
    },
    tags: {
        in: ['body'],
        notEmpty: {
            errorMessage: 'Tags is required'
        }
    },
    content: {
        in: ['body'],
        notEmpty: {
            errorMessage: 'Content is required'
        }
    },
}