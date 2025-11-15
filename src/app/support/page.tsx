export const metadata = {
  title: "Support"
};

export default function SupportPage() {
  return (
    <div className="prose dark:prose-invert mx-auto max-w-3xl py-10">
      <h1>Support &amp; Contact</h1>
      <p>
        Besoin d’aide ? Notre équipe est disponible 7j/7 pour répondre à vos questions sur vos
        commandes, paiements ou intégrations.
      </p>
      <h2>Contact rapide</h2>
      <ul>
        <li>Email : <a href="mailto:support@shoply.dev">support@shoply.dev</a></li>
        <li>Téléphone : +33 1 23 45 67 89</li>
        <li>Chat in-app disponible sur votre dashboard client</li>
      </ul>
      <p>
        Nous répondons en moins de 24h ouvrées. Merci de fournir un maximum d’informations (numéro de
        commande, email utilisé, captures d’écran).
      </p>
    </div>
  );
}

