"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    console.log('🌱 Début du seeding de la base de données...\n');
    console.log('🗑️  Nettoyage de la base de données...');
    await prisma.review.deleteMany();
    await prisma.orderItem.deleteMany();
    await prisma.order.deleteMany();
    await prisma.file.deleteMany();
    await prisma.model3D.deleteMany();
    await prisma.artist.deleteMany();
    await prisma.user.deleteMany();
    console.log('✅ Base de données nettoyée\n');
    console.log('👤 Création des utilisateurs...');
    const artistUser1 = await prisma.user.create({
        data: {
            email: 'davinci@marketplace.com',
            password: '$2b$10$abcdefghijklmnopqrstuv',
            username: 'DaVinci_Digital',
            firstName: 'Leonardo',
            lastName: 'Da Vinci',
            roles: [client_1.Role.USER, client_1.Role.ARTIST],
            country: 'FR',
            profilePicture: 'https://ui-avatars.com/api/?name=Leonardo+Da+Vinci&background=4F46E5&color=fff',
            artist: {
                create: {
                    siret: '12345678901234',
                    shopDescription: 'Créateur de modèles Low Poly de haute qualité pour le jeu vidéo. Spécialisé dans les armes et équipements fantasy.',
                    portfolioLink: 'https://davinci-digital.art',
                },
            },
        },
        include: {
            artist: true,
        },
    });
    console.log(`✅ Artiste créé : ${artistUser1.username} (Artist ID: ${artistUser1.artist?.id})`);
    const artistUser2 = await prisma.user.create({
        data: {
            email: 'marie@marketplace.com',
            password: '$2b$10$abcdefghijklmnopqrstuv',
            username: 'PixelSculptor',
            firstName: 'Marie',
            lastName: 'Curie',
            roles: [client_1.Role.USER, client_1.Role.ARTIST],
            country: 'FR',
            profilePicture: 'https://ui-avatars.com/api/?name=Marie+Curie&background=EC4899&color=fff',
            artist: {
                create: {
                    siret: '98765432109876',
                    shopDescription: 'Spécialisée dans les personnages stylisés et les environnements sci-fi.',
                    portfolioLink: 'https://pixelsculptor.com',
                },
            },
        },
        include: {
            artist: true,
        },
    });
    console.log(`✅ Artiste créé : ${artistUser2.username} (Artist ID: ${artistUser2.artist?.id})`);
    const clientUser = await prisma.user.create({
        data: {
            email: 'client@marketplace.com',
            password: '$2b$10$abcdefghijklmnopqrstuv',
            username: 'GamerDu59',
            firstName: 'Jean',
            lastName: 'Dupont',
            roles: [client_1.Role.USER],
            country: 'FR',
            defaultAddress: '123 Rue de la Paix, 75001 Paris',
            profilePicture: 'https://ui-avatars.com/api/?name=Jean+Dupont&background=10B981&color=fff',
        },
    });
    console.log(`✅ Client créé : ${clientUser.username}`);
    const adminUser = await prisma.user.create({
        data: {
            email: 'admin@marketplace.com',
            password: '$2b$10$abcdefghijklmnopqrstuv',
            username: 'AdminMaster',
            firstName: 'Admin',
            lastName: 'System',
            roles: [client_1.Role.USER, client_1.Role.ADMIN],
            country: 'FR',
            profilePicture: 'https://ui-avatars.com/api/?name=Admin+System&background=EF4444&color=fff',
        },
    });
    console.log(`✅ Admin créé : ${adminUser.username}\n`);
    console.log('🎨 Création des modèles 3D...');
    const model1 = await prisma.model3D.create({
        data: {
            title: 'Épée Légendaire Low Poly',
            description: 'Une épée optimisée pour les jeux mobiles. Textures 4K incluses. Parfaite pour les jeux RPG et fantasy.',
            price: 15.99,
            status: client_1.ModelStatus.ONLINE,
            viewCount: 142,
            artistId: artistUser1.artist.id,
            files: {
                create: [
                    {
                        cloudUrl: 'https://placehold.co/800x600/4F46E5/FFFFFF/png?text=Epee+Legendaire',
                        type: client_1.FileType.RENDER_IMAGE,
                        format: 'PNG',
                        sizeKb: 350,
                    },
                    {
                        cloudUrl: '/models/sword.glb',
                        type: client_1.FileType.SOURCE_3D,
                        format: 'GLB',
                        sizeKb: 1536,
                    },
                ],
            },
        },
    });
    console.log(`✅ Modèle créé : ${model1.title} (ID: ${model1.id})`);
    const model2 = await prisma.model3D.create({
        data: {
            title: 'Pack Végétation Low Poly',
            description: '50 assets de végétation optimisés : arbres, buissons, herbes. Idéal pour les jeux mobiles et WebGL.',
            price: 29.99,
            status: client_1.ModelStatus.ONLINE,
            viewCount: 89,
            artistId: artistUser1.artist.id,
            files: {
                create: [
                    {
                        cloudUrl: 'https://placehold.co/800x600/10B981/FFFFFF/png?text=Pack+Vegetation',
                        type: client_1.FileType.RENDER_IMAGE,
                        format: 'PNG',
                        sizeKb: 420,
                    },
                    {
                        cloudUrl: '/models/vegetation_pack.glb',
                        type: client_1.FileType.SOURCE_3D,
                        format: 'GLB',
                        sizeKb: 2048,
                    },
                ],
            },
        },
    });
    console.log(`✅ Modèle créé : ${model2.title} (ID: ${model2.id})`);
    const model3 = await prisma.model3D.create({
        data: {
            title: 'Vaisseau Spatial Futuriste',
            description: 'Vaisseau spatial stylisé avec animations. Textures PBR, effets de lumière inclus.',
            price: 49.99,
            status: client_1.ModelStatus.ONLINE,
            viewCount: 203,
            artistId: artistUser2.artist.id,
            files: {
                create: [
                    {
                        cloudUrl: 'https://placehold.co/800x600/8B5CF6/FFFFFF/png?text=Vaisseau+Spatial',
                        type: client_1.FileType.RENDER_IMAGE,
                        format: 'PNG',
                        sizeKb: 580,
                    },
                    {
                        cloudUrl: '/models/spaceship.glb',
                        type: client_1.FileType.SOURCE_3D,
                        format: 'GLB',
                        sizeKb: 3072,
                    },
                ],
            },
        },
    });
    console.log(`✅ Modèle créé : ${model3.title} (ID: ${model3.id})`);
    const model4 = await prisma.model3D.create({
        data: {
            title: 'Personnage Robot Animé',
            description: 'Robot low poly avec 20 animations. Rig complet, prêt pour Unity et Unreal Engine.',
            price: 39.99,
            status: client_1.ModelStatus.ONLINE,
            viewCount: 156,
            artistId: artistUser2.artist.id,
            files: {
                create: [
                    {
                        cloudUrl: 'https://placehold.co/800x600/EC4899/FFFFFF/png?text=Robot+Anime',
                        type: client_1.FileType.RENDER_IMAGE,
                        format: 'PNG',
                        sizeKb: 490,
                    },
                    {
                        cloudUrl: '/models/robot.glb',
                        type: client_1.FileType.SOURCE_3D,
                        format: 'GLB',
                        sizeKb: 2560,
                    },
                ],
            },
        },
    });
    console.log(`✅ Modèle créé : ${model4.title} (ID: ${model4.id})`);
    const model5 = await prisma.model3D.create({
        data: {
            title: 'Château Médiéval (En validation)',
            description: 'Grande forteresse médiévale, en attente de validation par l\'équipe.',
            price: 59.99,
            status: client_1.ModelStatus.PENDING,
            viewCount: 0,
            artistId: artistUser1.artist.id,
            files: {
                create: [
                    {
                        cloudUrl: 'https://placehold.co/800x600/F59E0B/FFFFFF/png?text=Chateau+Validation',
                        type: client_1.FileType.RENDER_IMAGE,
                        format: 'PNG',
                        sizeKb: 620,
                    },
                ],
            },
        },
    });
    console.log(`✅ Modèle créé : ${model5.title} (ID: ${model5.id}) - PENDING`);
    const model6 = await prisma.model3D.create({
        data: {
            title: 'Modèle Test Rejeté',
            description: 'Ce modèle a été rejeté pour non-conformité.',
            price: 9.99,
            status: client_1.ModelStatus.REJECTED,
            viewCount: 5,
            artistId: artistUser2.artist.id,
            files: {
                create: [
                    {
                        cloudUrl: 'https://placehold.co/800x600/EF4444/FFFFFF/png?text=Rejete',
                        type: client_1.FileType.RENDER_IMAGE,
                        format: 'PNG',
                        sizeKb: 150,
                    },
                ],
            },
        },
    });
    console.log(`✅ Modèle créé : ${model6.title} (ID: ${model6.id}) - REJECTED\n`);
    console.log('⭐ Création des avis...');
    await prisma.review.create({
        data: {
            rating: 5,
            comment: 'Excellente qualité ! Textures magnifiques et optimisation parfaite. Je recommande vivement !',
            authorId: clientUser.id,
            modelId: model1.id,
        },
    });
    await prisma.review.create({
        data: {
            rating: 4,
            comment: 'Très bon modèle, manque juste quelques variations de textures.',
            authorId: adminUser.id,
            modelId: model1.id,
        },
    });
    await prisma.review.create({
        data: {
            rating: 5,
            comment: 'Pack complet et très utile pour mon projet de jeu mobile ! Rapport qualité/prix imbattable.',
            authorId: clientUser.id,
            modelId: model2.id,
        },
    });
    await prisma.review.create({
        data: {
            rating: 5,
            comment: 'Design incroyable ! Les animations sont fluides et les textures PBR sont magnifiques.',
            authorId: clientUser.id,
            modelId: model3.id,
        },
    });
    await prisma.review.create({
        data: {
            rating: 4,
            comment: 'Beau modèle avec de bonnes animations. Quelques petits bugs sur Unity mais rien de grave.',
            authorId: adminUser.id,
            modelId: model4.id,
        },
    });
    const client2 = await prisma.user.create({
        data: {
            email: 'devgame@test.com',
            password: '$2b$10$abcdefghijklmnopqrstuv',
            username: 'DevGameStudio',
            firstName: 'Alice',
            lastName: 'Martin',
            roles: [client_1.Role.USER],
            country: 'FR',
            profilePicture: 'https://ui-avatars.com/api/?name=Alice+Martin&background=8B5CF6&color=fff',
        },
    });
    await prisma.review.create({
        data: {
            rating: 3,
            comment: 'Correct pour le prix. Manque un peu de détails sur certains assets.',
            authorId: client2.id,
            modelId: model2.id,
        },
    });
    await prisma.review.create({
        data: {
            rating: 2,
            comment: 'Déçu, le modèle ne correspond pas exactement aux screenshots.',
            authorId: client2.id,
            modelId: model4.id,
        },
    });
    const client3 = await prisma.user.create({
        data: {
            email: 'gamer123@test.com',
            password: '$2b$10$abcdefghijklmnopqrstuv',
            username: 'ProGamer123',
            firstName: 'Thomas',
            lastName: 'Bernard',
            roles: [client_1.Role.USER],
            country: 'FR',
            profilePicture: 'https://ui-avatars.com/api/?name=Thomas+Bernard&background=F59E0B&color=fff',
        },
    });
    await prisma.review.create({
        data: {
            rating: 1,
            comment: 'Mauvaise qualité, ne fonctionne pas sur Unreal Engine 5. Demande de remboursement en cours.',
            authorId: client3.id,
            modelId: model3.id,
        },
    });
    console.log(`✅ ${8} avis créés (ratings: 1 à 5)\n`);
    console.log('🛒 Création des commandes...');
    const order1 = await prisma.order.create({
        data: {
            totalAmount: 45.98,
            paymentStatus: client_1.PaymentStatus.PAID,
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
                        modelTitleSnapshot: model1.title,
                    },
                    {
                        quantity: 1,
                        unitPricePaid: 29.99,
                        modelId: model2.id,
                        modelTitleSnapshot: model2.title,
                    },
                ],
            },
        },
        include: {
            items: true,
        },
    });
    console.log(`✅ Commande créée : Order #${order1.id} - PAID (${order1.items.length} articles)`);
    const order2 = await prisma.order.create({
        data: {
            totalAmount: 49.99,
            paymentStatus: client_1.PaymentStatus.FAILED,
            billingName: 'Jean Dupont',
            billingAddress: '123 Rue de la Paix, 75001 Paris',
            billingCountry: 'France',
            appliedVat: 20.0,
            customerId: clientUser.id,
            items: {
                create: [
                    {
                        quantity: 1,
                        unitPricePaid: 49.99,
                        modelId: model3.id,
                        modelTitleSnapshot: model3.title,
                    },
                ],
            },
        },
        include: {
            items: true,
        },
    });
    console.log(`✅ Commande créée : Order #${order2.id} - FAILED (${order2.items.length} article)`);
    const order3 = await prisma.order.create({
        data: {
            totalAmount: 39.99,
            paymentStatus: client_1.PaymentStatus.REFUNDED,
            billingName: 'Alice Martin',
            billingAddress: '456 Avenue des Champs, 69000 Lyon',
            billingCountry: 'France',
            appliedVat: 20.0,
            customerId: client2.id,
            items: {
                create: [
                    {
                        quantity: 1,
                        unitPricePaid: 39.99,
                        modelId: model4.id,
                        modelTitleSnapshot: model4.title,
                    },
                ],
            },
        },
        include: {
            items: true,
        },
    });
    console.log(`✅ Commande créée : Order #${order3.id} - REFUNDED (${order3.items.length} article)\n`);
    const userCount = await prisma.user.count();
    const artistCount = await prisma.artist.count();
    const modelCount = await prisma.model3D.count();
    const reviewCount = await prisma.review.count();
    const orderCount = await prisma.order.count();
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📊 RÉSUMÉ DU SEEDING');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`👤 Utilisateurs créés : ${userCount}`);
    console.log(`   ├─ Artistes : ${artistCount}`);
    console.log(`   ├─ Clients : ${userCount - artistCount - 1}`);
    console.log(`   └─ Admins : 1`);
    console.log(`🎨 Modèles 3D créés : ${modelCount}`);
    console.log(`   ├─ En ligne (ONLINE) : 4`);
    console.log(`   ├─ En attente (PENDING) : 1`);
    console.log(`   └─ Rejetés (REJECTED) : 1`);
    console.log(`⭐ Avis créés : ${reviewCount}`);
    console.log(`   ├─ Note 5/5 : 4 avis`);
    console.log(`   ├─ Note 4/5 : 2 avis`);
    console.log(`   ├─ Note 3/5 : 1 avis`);
    console.log(`   ├─ Note 2/5 : 1 avis`);
    console.log(`   └─ Note 1/5 : 1 avis (note minimale)`);
    console.log(`🛒 Commandes créées : ${orderCount}`);
    console.log(`   ├─ Payées (PAID) : 1`);
    console.log(`   ├─ Échouées (FAILED) : 1`);
    console.log(`   └─ Remboursées (REFUNDED) : 1`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('✅ Seeding terminé avec succès ! 🎉');
    console.log('✅ Tous les ratings sont valides (entre 1 et 5)');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
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
//# sourceMappingURL=seed.js.map