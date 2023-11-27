module.exports  = {
    register: {
        body: {
            type: 'object',
            required: ['name', 'email', 'password'],
            properties: {
                name: {
                    type: 'string',
                    minLength: 2,
                    ignore_whitespace: true,
                    errorMessage: 'Name should be at least 2 characters long'
                },
                email: {
                    type: 'string',
                    format: 'email',
                    ignore_whitespace: true,
                    errorMessage: 'Invalid email'
                },
                password: {
                    type: 'string',
                    minLength: 6,
                    ignore_whitespace: true,
                    errorMessages: {
                        minLength: 'Password should be at least 6 characters long'
                    }
                }
            }
        }
    },
    login: {
        body: {
            type: 'object',
            required: ['email', 'password'],
            properties: {
                email: {
                    type: 'string',
                    format: 'email',
                    ignore_whitespace: true,
                    errorMessage: 'Invalid email'
                },
                password: {
                    type: 'string',
                    minLength: 6,
                    ignore_whitespace: true,
                    errorMessages: {
                        minLength: 'Password should be at least 6 characters long'
                    }
                }
            }
        }
    }
}