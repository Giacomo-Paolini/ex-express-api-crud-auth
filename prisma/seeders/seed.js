const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const posts = [
  {
      title: "Celestial Peaks of Mount Alabaster",
      slug: "celestial-peaks-mount-alabaster",
      image: "https://picsum.photos/id/177/1920/1080",
      content: "Explore the surreal peaks of Mount Alabaster, a unique mountaineering experience among the clouds and natural wonders.",
      published: true,
      category: "Mountaineering",
      tags: ["alpine adventure", "celestial panoramas", "extraordinary nature"]
  },
  {
      title: "Wild Reserve: Odyssey in the Enchanted Forest",
      slug: "wild-reserve-enchanted-forest",
      image: "https://picsum.photos/id/121/1920/1080",
      content: "Venture into the enchanted forest of a wild reserve, where biodiversity reveals secrets of extraordinary flora and fauna.",
      published: true,
      category: "Trekking",
      tags: ["wild adventure", "magical biodiversity", "unique exploration"]
  },
  {
      title: "Rainbow Falls: Kayaking amid the Wonders of Iguazu",
      slug: "rainbow-falls-kayaking-iguazu",
      image: "https://picsum.photos/id/509/1920/1080",
      content: "Experience a rainbow of emotions on a kayak excursion through the spectacular Iguazu Falls, a journey through water and color.",
      published: true,
      category: "Kayaking",
      tags: ["magical waterfalls", "aquatic adventure", "vibrant nature"]
  },
  {
      title: "Machu Picchu: Journey into the Heart of the Inca",
      slug: "machu-picchu-journey-heart-inca",
      image: "https://picsum.photos/id/537/1920/1080",
      content: "A cultural adventure in the heart of the ancient Inca, exploring the mysteries and grandeur of Machu Picchu.",
      published: true,
      category: "Cultural",
      tags: ["millenary history", "ancient culture", "fascinating archaeology"]
  },
  {
      title: "Enchanted Depths: Scuba Diving in the Coral Reef",
      slug: "enchanted-depths-scuba-diving-coral-reef",
      image: "https://picsum.photos/id/124/1920/1080",
      content: "Explore the enchanted depths of the Great Barrier Reef on a scuba diving excursion, immersing yourself in a colorful and fascinating marine world.",
      published: true,
      category: "Scuba Diving",
      tags: ["underwater exploration", "magical coral reef", "unique marine life"]
  }
];

(async function () {
  for (let post of posts) {
      const { category, tags, ...postData } = post;

      const createdPost = await prisma.post.create({
          data: postData
      });

      await prisma.category.create({
          data: {
              title: category,
              posts: {
                  connect: {
                      id: createdPost.id
                  }
              }
          }
      });

      for (let tag of tags) {
          await prisma.tag.create({
              data: {
                  title: tag,
                  posts: {
                      connect: {
                          id: createdPost.id
                      }
                  }
              }
          });
      }
  }
})();
