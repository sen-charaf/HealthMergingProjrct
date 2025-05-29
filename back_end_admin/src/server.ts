import dotenv from "dotenv";
import app from "./app";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
dotenv.config();

const PORT = process.env.BACKEND_PORT || 5000;

async function startServer() {
  try {
    // Vérifier la connexion à la base de données
    await prisma.$connect();
    console.log("Base de données PostgreSQL connectée");

    app.listen(PORT, () => {
      console.log(
        `Serveur démarré sur http://localhost:${PORT} avec build en temps réel`
      );
    });
  } catch (error) {
    console.error("Erreur de connexion à la base de données :", error);
    process.exit(1);
  } finally {
    // Déconnexion propre lors de l'arrêt du serveur
    process.on("beforeExit", async () => {
      await prisma.$disconnect();
    });
  }
}

startServer();
