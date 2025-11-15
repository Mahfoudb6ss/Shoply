export const metadata = {
  title: "Terms & Conditions"
};

export default function TermsPage() {
  return (
    <div className="prose dark:prose-invert mx-auto max-w-3xl py-10">
      <h1>Terms &amp; Conditions</h1>
      <p>
        En utilisant Shoply vous acceptez nos conditions générales : respect des droits d’auteur,
        usage loyal de la plateforme et conformité aux lois locales. Les prix et disponibilités
        peuvent évoluer sans préavis.
      </p>
      <h2>Commandes et paiements</h2>
      <p>
        Toute commande est considérée comme ferme après confirmation de paiement. Les remboursements
        suivent notre politique interne.
      </p>
      <h2>Responsabilité</h2>
      <p>
        Shoply s’efforce d’assurer la continuité du service mais ne saurait être tenue responsable
        des interruptions dues à des facteurs externes.
      </p>
      <p>Contact : <a href="mailto:support@shoply.dev">support@shoply.dev</a></p>
    </div>
  );
}

