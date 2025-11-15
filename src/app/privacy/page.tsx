export const metadata = {
  title: "Privacy Policy"
};

export default function PrivacyPage() {
  return (
    <div className="prose dark:prose-invert mx-auto max-w-3xl py-10">
      <h1>Privacy Policy</h1>
      <p>
        Shoply respecte la vie privée de ses utilisateurs. Les données collectées sont limitées
        aux informations nécessaires pour assurer le fonctionnement de la boutique (compte,
        commandes, analytics). Elles ne sont jamais revendues à des tiers.
      </p>
      <h2>Données collectées</h2>
      <ul>
        <li>Informations de compte (nom, email, rôle)</li>
        <li>Historique de commandes et préférences produits</li>
        <li>Données techniques (logs, analytics anonymisés)</li>
      </ul>
      <h2>Contact</h2>
      <p>
        Pour toute demande liée à la confidentialité, écrivez-nous à{" "}
        <a href="mailto:support@shoply.dev">support@shoply.dev</a>.
      </p>
    </div>
  );
}

