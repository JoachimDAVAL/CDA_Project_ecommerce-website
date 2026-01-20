-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN', 'ARTIST');

-- CreateEnum
CREATE TYPE "ModelStatus" AS ENUM ('EN_ATTENTE', 'EN_LIGNE', 'REJETE');

-- CreateEnum
CREATE TYPE "FileType" AS ENUM ('SOURCE_3D', 'IMAGE_RENDU');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PAYE', 'ECHOUE', 'REMBOURSE');

-- CreateTable
CREATE TABLE "utilisateur" (
    "id_user" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "mot_de_passe" TEXT NOT NULL,
    "pseudo" TEXT NOT NULL,
    "date_inscription" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "roles" JSONB NOT NULL,
    "nom" TEXT,
    "prenom" TEXT,
    "adresse_defaut" TEXT,
    "pays_residence" TEXT,

    CONSTRAINT "utilisateur_pkey" PRIMARY KEY ("id_user")
);

-- CreateTable
CREATE TABLE "artiste" (
    "id_user" INTEGER NOT NULL,
    "description_boutique" TEXT,
    "siret" TEXT,
    "lien_portfolio" TEXT,

    CONSTRAINT "artiste_pkey" PRIMARY KEY ("id_user")
);

-- CreateTable
CREATE TABLE "modele_3d" (
    "id_modele" SERIAL NOT NULL,
    "titre" TEXT NOT NULL,
    "description" TEXT,
    "prix" DECIMAL(10,2) NOT NULL,
    "date_creation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "statut" "ModelStatus" NOT NULL DEFAULT 'EN_ATTENTE',
    "nombre_vues" INTEGER NOT NULL DEFAULT 0,
    "id_artiste" INTEGER NOT NULL,

    CONSTRAINT "modele_3d_pkey" PRIMARY KEY ("id_modele")
);

-- CreateTable
CREATE TABLE "fichier" (
    "id_fichier" SERIAL NOT NULL,
    "url_cloud" TEXT NOT NULL,
    "type" "FileType" NOT NULL,
    "format" TEXT,
    "taille_ko" INTEGER,
    "id_modele" INTEGER NOT NULL,

    CONSTRAINT "fichier_pkey" PRIMARY KEY ("id_fichier")
);

-- CreateTable
CREATE TABLE "commande" (
    "id_commande" SERIAL NOT NULL,
    "date_commande" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "montant_total" DECIMAL(10,2) NOT NULL,
    "statut_paiement" "PaymentStatus" NOT NULL,
    "nom_facturation" TEXT NOT NULL,
    "adresse_facturation" TEXT NOT NULL,
    "pays_facturation" TEXT NOT NULL,
    "tva_appliquee" DECIMAL(5,2) NOT NULL,
    "id_client" INTEGER,

    CONSTRAINT "commande_pkey" PRIMARY KEY ("id_commande")
);

-- CreateTable
CREATE TABLE "ligne_commande" (
    "id_ligne" SERIAL NOT NULL,
    "quantite" INTEGER NOT NULL DEFAULT 1,
    "prix_unitaire_achat" DECIMAL(10,2) NOT NULL,
    "id_commande" INTEGER NOT NULL,
    "id_modele" INTEGER,

    CONSTRAINT "ligne_commande_pkey" PRIMARY KEY ("id_ligne")
);

-- CreateTable
CREATE TABLE "avis" (
    "id_avis" SERIAL NOT NULL,
    "note" SMALLINT NOT NULL,
    "commentaire" TEXT,
    "date_avis" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id_auteur" INTEGER NOT NULL,
    "id_modele" INTEGER NOT NULL,

    CONSTRAINT "avis_pkey" PRIMARY KEY ("id_avis")
);

-- CreateIndex
CREATE UNIQUE INDEX "utilisateur_email_key" ON "utilisateur"("email");

-- AddForeignKey
ALTER TABLE "artiste" ADD CONSTRAINT "artiste_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "utilisateur"("id_user") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "modele_3d" ADD CONSTRAINT "modele_3d_id_artiste_fkey" FOREIGN KEY ("id_artiste") REFERENCES "artiste"("id_user") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fichier" ADD CONSTRAINT "fichier_id_modele_fkey" FOREIGN KEY ("id_modele") REFERENCES "modele_3d"("id_modele") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "commande" ADD CONSTRAINT "commande_id_client_fkey" FOREIGN KEY ("id_client") REFERENCES "utilisateur"("id_user") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ligne_commande" ADD CONSTRAINT "ligne_commande_id_commande_fkey" FOREIGN KEY ("id_commande") REFERENCES "commande"("id_commande") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ligne_commande" ADD CONSTRAINT "ligne_commande_id_modele_fkey" FOREIGN KEY ("id_modele") REFERENCES "modele_3d"("id_modele") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "avis" ADD CONSTRAINT "avis_id_auteur_fkey" FOREIGN KEY ("id_auteur") REFERENCES "utilisateur"("id_user") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "avis" ADD CONSTRAINT "avis_id_modele_fkey" FOREIGN KEY ("id_modele") REFERENCES "modele_3d"("id_modele") ON DELETE CASCADE ON UPDATE CASCADE;
