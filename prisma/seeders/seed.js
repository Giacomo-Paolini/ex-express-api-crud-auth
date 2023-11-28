const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const posts = [
    {
        title: "Vette Celesti del Monte Alabastro",
        slug: "vette-celesti-monte-alabastro",
        image: "https://picsum.photos/id/177/1920/1080",
        content: "Esplora le vette surreali del Monte Alabastro, un'esperienza alpinistica unica tra le nuvole e le meraviglie naturali.",
        published: true,
        category: "Alpinismo",
        tags: ["avventura alpina", "panorami celesti", "natura straordinaria"]
      },
      {
        title: "Riserva Selvaggia: Odissea nella Foresta Incantata",
        slug: "riserva-selvaggia-foresta-incantata",
        image: "https://picsum.photos/id/121/1920/1080",
        content: "Avventurati nella foresta incantata di una riserva selvaggia, dove la biodiversità svela segreti di flora e fauna straordinari.",
        published: true,
        category: "Trekking",
        tags: ["avventura selvaggia", "biodiversità magica", "esplorazione unica"]
      },
      {
        title: "Cascate Arcobaleno: Kayak tra le Meraviglie di Iguazù",
        slug: "cascate-arcobaleno-kayak-iguazu",
        image: "https://picsum.photos/id/509/1920/1080",
        content: "Vivi l'arcobaleno di emozioni in un'escursione in kayak attraverso le spettacolari Cascate di Iguazù, un viaggio tra acqua e colore.",
        published: true,
        category: "Kayak",
        tags: ["cascate magiche", "avventura acquatica", "natura vibrante"]
      },
      {
        title: "Machu Picchu: Viaggio nel Cuore degli Inca",
        slug: "machu-picchu-viaggio-cuore-inca",
        image: "https://picsum.photos/id/537/1920/1080",
        content: "Un'avventura culturale nel cuore degli antichi Inca, esplorando i misteri e la grandezza di Machu Picchu.",
        published: true,
        category: "Culturale",
        tags: ["storia millenaria", "cultura antica", "archeologia affascinante"]
      },
      {
        title: "Profondità Incantate: Subacquea nella Barriera di Corallo",
        slug: "profondita-incantate-subacquea-barriera-corallo",
        image: "https://picsum.photos/id/552/1920/1080",
        content: "Esplora le profondità incantate della Grande Barriera Corallina in un'escursione subacquea, immergendoti in un mondo marino colorato e affascinante.",
        published: true,
        category: "Subacquea",
        tags: ["esplorazione subacquea", "barriera corallina magica", "vita marina unica"]
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
