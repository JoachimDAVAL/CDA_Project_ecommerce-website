import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Début du seeding...');

  // 1. Nettoyer la base (Optionnel mais conseillé)
  await prisma.review.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.file.deleteMany();
  await prisma.model3D.deleteMany();
  await prisma.artist.deleteMany();
  await prisma.user.deleteMany();

  // 2. Créer un Artiste (Qui est aussi un User)
  const artistUser = await prisma.user.create({
    data: {
      email: 'artist@test.com',
      mot_de_passe: 'password123', // En vrai projet, il faudra le hacher (bcrypt)
      pseudo: 'DaVinci_Digital',
      roles: ['ROLE_USER', 'ROLE_ARTIST'],
      artist: {
        create: {
          siret: '12345678900012',
          description_boutique: 'Créateur de modèles Low Poly pour le jeu vidéo.',
        },
      },
    },
  });

  console.log(`✅ Artiste créé : ${artistUser.pseudo}`);

  // 3. Créer un Client simple
  const clientUser = await prisma.user.create({
    data: {
      email: 'client@test.com',
      mot_de_passe: 'password123',
      pseudo: 'GamerDu59',
      roles: ['ROLE_USER'],
    },
  });

  console.log(`✅ Client créé : ${clientUser.pseudo}`);

  // 4. Créer des Modèles 3D pour l'artiste
  const model1 = await prisma.model3D.create({
    data: {
      titre: 'Épée Légendaire Low Poly',
      description: 'Une épée optimisée pour les jeux mobiles. Textures 4K incluses.',
      prix: 15.99,
      statut: 'EN_LIGNE', // Important pour qu'il s'affiche dans votre catalogue
      id_artiste: artistUser.id_user,
      files: {
        create: [
          {
            url_cloud: 'https://placehold.co/600x400/png?text=Epee+Rendu',
            type: 'IMAGE_RENDU',
          },
          {
            url_cloud: 'https://example.com/files/sword.glb',
            type: 'SOURCE_3D',
          },
        ],
      },
    },
  });

  const model2 = await prisma.model3D.create({
    data: {
      titre: 'Vaisseau Spatial (Brouillon)',
      description: 'Work in progress, pas encore fini.',
      prix: 45.00,
      statut: 'EN_ATTENTE', // Celui-ci ne devra PAS s'afficher dans le catalogue public
      id_artiste: artistUser.id_user,
    },
  });

  console.log(`✅ Modèles créés : ${model1.titre} et ${model2.titre}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });