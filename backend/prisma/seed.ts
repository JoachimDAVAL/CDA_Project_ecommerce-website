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

  console.log('🗑️  Base de données nettoyée');

  // 2. Créer un Artiste (Qui est aussi un User)
  const artistUser = await prisma.user.create({
    data: {
      email: 'artist@test.com',
      password: 'password123', // En vrai projet, il faudra le hacher (bcrypt)
      username: 'DaVinci_Digital',
      firstName: 'Leonardo',
      lastName: 'Da Vinci',
      roles: ['ROLE_USER', 'ROLE_ARTIST'],
      country: 'FR',
      artist: {
        create: {
          siret: '12345678900012',
          shopDescription: 'Créateur de modèles Low Poly pour le jeu vidéo.',
          portfolioLink: 'https://davinci-digital.art',
        },
      },
    },
  });

  console.log(`✅ Artiste créé : ${artistUser.username} (ID: ${artistUser.id})`);

  // 3. Créer un deuxième Artiste
  const artistUser2 = await prisma.user.create({
    data: {
      email: 'sculptor@test.com',
      password: 'password123',
      username: 'PixelSculptor',
      firstName: 'Marie',
      lastName: 'Curie',
      roles: ['ROLE_USER', 'ROLE_ARTIST'],
      country: 'FR',
      artist: {
        create: {
          siret: '98765432100015',
          shopDescription: 'Spécialisée dans les personnages stylisés et environnements fantastiques.',
          portfolioLink: 'https://pixelsculptor.com',
        },
      },
    },
  });

  console.log(`✅ Artiste créé : ${artistUser2.username} (ID: ${artistUser2.id})`);

  // 4. Créer un Client simple
  const clientUser = await prisma.user.create({
    data: {
      email: 'client@test.com',
      password: 'password123',
      username: 'GamerDu59',
      firstName: 'Jean',
      lastName: 'Dupont',
      roles: ['ROLE_USER'],
      country: 'FR',
      defaultAddress: '123 Rue de la Paix, 75001 Paris',
    },
  });

  console.log(`✅ Client créé : ${clientUser.username} (ID: ${clientUser.id})`);

  // 5. Créer des Modèles 3D pour le premier artiste
  const model1 = await prisma.model3D.create({
    data: {
      title: 'Épée Légendaire Low Poly',
      description:
        'Une épée optimisée pour les jeux mobiles. Textures 4K incluses. Parfaite pour des jeux d\'action-aventure avec un style cartoon.',
      price: 15.99,
      status: 'ONLINE', // Important pour qu'il s'affiche dans votre catalogue
      viewCount: 42,
      artistId: artistUser.id,
      files: {
        create: [
          {
            cloudUrl: 'https://placehold.co/600x400/4F46E5/FFFFFF/png?text=Epee+Legendaire',
            type: 'RENDER_IMAGE',
            format: 'PNG',
            sizeKb: 250,
          },
          {
            cloudUrl: 'https://example.com/files/legendary-sword.glb',
            type: 'SOURCE_3D',
            format: 'GLB',
            sizeKb: 1024,
          },
        ],
      },
    },
  });

  console.log(`✅ Modèle créé : ${model1.title}`);

  const model2 = await prisma.model3D.create({
    data: {
      title: 'Vaisseau Spatial (Brouillon)',
      description: 'Work in progress, pas encore fini. Modèle en cours de validation.',
      price: 45.0,
      status: 'PENDING', // Celui-ci ne devra PAS s'afficher dans le catalogue public
      viewCount: 5,
      artistId: artistUser.id,
      files: {
        create: [
          {
            cloudUrl: 'https://placehold.co/600x400/94A3B8/FFFFFF/png?text=Vaisseau+WIP',
            type: 'RENDER_IMAGE',
            format: 'PNG',
            sizeKb: 180,
          },
        ],
      },
    },
  });

  console.log(`✅ Modèle créé : ${model2.title}`);

  const model3 = await prisma.model3D.create({
    data: {
      title: 'Pack de Végétation Low Poly',
      description:
        'Un pack complet de 50+ plantes et arbres low poly. Idéal pour créer des forêts stylisées. Textures optimisées.',
      price: 29.99,
      status: 'ONLINE',
      viewCount: 128,
      artistId: artistUser.id,
      files: {
        create: [
          {
            cloudUrl: 'https://placehold.co/600x400/10B981/FFFFFF/png?text=Vegetation+Pack',
            type: 'RENDER_IMAGE',
            format: 'PNG',
            sizeKb: 320,
          },
          {
            cloudUrl: 'https://example.com/files/vegetation-pack.zip',
            type: 'SOURCE_3D',
            format: 'FBX',
            sizeKb: 5120,
          },
        ],
      },
    },
  });

  console.log(`✅ Modèle créé : ${model3.title}`);

  // 6. Créer des Modèles pour le deuxième artiste
  const model4 = await prisma.model3D.create({
    data: {
      title: 'Personnage Fantasy Rigged',
      description:
        'Personnage stylisé avec rig complet et animations de base (idle, walk, run, attack). Compatible avec Unity et Unreal Engine.',
      price: 79.99,
      status: 'ONLINE',
      viewCount: 256,
      artistId: artistUser2.id,
      files: {
        create: [
          {
            cloudUrl: 'https://placehold.co/600x400/8B5CF6/FFFFFF/png?text=Fantasy+Character',
            type: 'RENDER_IMAGE',
            format: 'PNG',
            sizeKb: 420,
          },
          {
            cloudUrl: 'https://example.com/files/fantasy-character.fbx',
            type: 'SOURCE_3D',
            format: 'FBX',
            sizeKb: 8192,
          },
        ],
      },
    },
  });

  console.log(`✅ Modèle créé : ${model4.title}`);

  const model5 = await prisma.model3D.create({
    data: {
      title: 'Château Médiéval Modulaire',
      description:
        'Kit complet de pièces modulaires pour construire votre propre château. Plus de 100 éléments inclus (murs, tours, portes, décorations).',
      price: 49.99,
      status: 'ONLINE',
      viewCount: 89,
      artistId: artistUser2.id,
      files: {
        create: [
          {
            cloudUrl: 'https://placehold.co/600x400/EF4444/FFFFFF/png?text=Medieval+Castle',
            type: 'RENDER_IMAGE',
            format: 'PNG',
            sizeKb: 380,
          },
          {
            cloudUrl: 'https://example.com/files/castle-modular.blend',
            type: 'SOURCE_3D',
            format: 'BLEND',
            sizeKb: 12288,
          },
        ],
      },
    },
  });

  console.log(`✅ Modèle créé : ${model5.title}`);

  const model6 = await prisma.model3D.create({
    data: {
      title: 'Modèle Rejeté - Test',
      description: 'Ce modèle a été rejeté pour non-conformité.',
      price: 10.0,
      status: 'REJECTED',
      viewCount: 2,
      artistId: artistUser2.id,
    },
  });

  console.log(`✅ Modèle créé : ${model6.title} (statut: REJECTED)`);

  // 7. Créer des avis pour les modèles en ligne
  const review1 = await prisma.review.create({
    data: {
      rating: 5,
      comment:
        'Excellente qualité ! Parfait pour mon jeu mobile. Les textures sont magnifiques et le modèle est très bien optimisé.',
      authorId: clientUser.id,
      modelId: model1.id,
    },
  });

  const review2 = await prisma.review.create({
    data: {
      rating: 4,
      comment: 'Très bon pack, juste dommage qu\'il n\'y ait pas plus de variété de plantes.',
      authorId: clientUser.id,
      modelId: model3.id,
    },
  });

  const review3 = await prisma.review.create({
    data: {
      rating: 5,
      comment: 'Incroyable ! Le rig est parfait et les animations sont fluides. Je recommande à 100% !',
      authorId: clientUser.id,
      modelId: model4.id,
    },
  });

  console.log(`✅ ${3} avis créés`);

  // 8. Créer une commande avec plusieurs items
  const order1 = await prisma.order.create({
    data: {
      totalAmount: 45.98,
      paymentStatus: 'PAID',
      billingName: 'Jean Dupont',
      billingAddress: '123 Rue de la Paix, 75001 Paris',
      billingCountry: 'France',
      appliedVat: 20.0,
      customerId: clientUser.id,
      items: {
        create: [
          {
            quantity: 1,
            unitPricePaid: 15.99,
            modelId: model1.id,
          },
          {
            quantity: 1,
            unitPricePaid: 29.99,
            modelId: model3.id,
          },
        ],
      },
    },
  });

  console.log(`✅ Commande créée : Order #${order1.id} (${order1.totalAmount}€)`);

  // 9. Créer une commande échouée
  const order2 = await prisma.order.create({
    data: {
      totalAmount: 79.99,
      paymentStatus: 'FAILED',
      billingName: 'Jean Dupont',
      billingAddress: '123 Rue de la Paix, 75001 Paris',
      billingCountry: 'France',
      appliedVat: 20.0,
      customerId: clientUser.id,
      items: {
        create: [
          {
            quantity: 1,
            unitPricePaid: 79.99,
            modelId: model4.id,
          },
        ],
      },
    },
  });

  console.log(`✅ Commande créée : Order #${order2.id} (FAILED)`);

  // 10. Résumé
  console.log('\n📊 Résumé du seeding :');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`👥 Utilisateurs créés : 3 (2 artistes, 1 client)`);
  console.log(`🎨 Modèles 3D créés : 6`);
  console.log(`   - EN LIGNE (ONLINE) : 4`);
  console.log(`   - EN ATTENTE (PENDING) : 1`);
  console.log(`   - REJETÉ (REJECTED) : 1`);
  console.log(`📁 Fichiers créés : 10`);
  console.log(`⭐ Avis créés : 3`);
  console.log(`🛒 Commandes créées : 2 (1 payée, 1 échouée)`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  console.log('✅ Seeding terminé avec succès !');
  console.log('\n🔗 Vous pouvez maintenant tester :');
  console.log('   - GET http://localhost:3000/models (devrait retourner 4 modèles)');
  console.log('   - Prisma Studio : npx prisma studio');
}

main()
  .catch((e) => {
    console.error('❌ Erreur lors du seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    console.log('👋 Déconnexion de Prisma');
  });