const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { validationResult, matchedData } = require('express-validator');

async function index(req, res) {
    const filter = {}
    const { word, published } = req.query
    if (published) {
        filter.published = published === 'true'
    }
    if (word) {
        filter.title = {
            contains: word
        }
    }
    
    const posts = await prisma.post.findMany({
        where: filter,
        include: {
            category: true,
            tags: true
        }
    })
    return res.json(posts);
}

async function store(req, res, next) {
    const validation = validationResult(req);
    if (!validation.isEmpty()) {
        return res.status(400).json({ errors: validation.array() });
    }

    const data = matchedData(req);

    const newPost = await prisma.post.create({
        data: {
            title: data.title,
            slug: data.slug,
            image: data.image,
            content: data.content,
            published: data.published,
            category: {
                create: {
                    title: data.category,
                }
            },
        }
    })
    
    for (let tag of data.tags) {
        await prisma.post.update({
            where: { id: newPost.id },
            data: {
                tags: {
                    create: { title: tag.title },
                },
            },
        });
    }

    return res.json(newPost);
}

async function show(req, res) {
    const slug = req.params.slug;
    const showPost = await prisma.post.findUnique({
        where: {
            slug: String(slug)
        }
    })

    return res.json(showPost);
}

async function update(req, res) {
    const slug = req.params.slug;
    const data = req.body;
    console.log(data)

    const post = await prisma.post.findUnique({
        where: {
            slug: String(slug)
        }
    })

    if (!post) {
        throw new Error('oh nooo')
    }

    const postUpdate = await prisma.post.update({
        data: data,
        where: {
            slug: String(slug),
        },
    })

    return res.json(postUpdate);
}

async function destroy(req, res) {
    const slug = req.params.slug;
    const postDelete = await prisma.post.delete({
        where: {
            slug: String(slug),
        },

    })
    if (!postDelete) {
        throw new Error('omggg')
    }

    return res.json('deleted post');
}

module.exports = {
    index,
    store,
    show,
    update,
    destroy
};