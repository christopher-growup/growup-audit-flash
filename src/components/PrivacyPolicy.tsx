export function PrivacyPolicy() {
  return (
    <div className="min-h-screen px-6 py-12 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Politique de confidentialité</h1>
      <div className="space-y-6 text-midnight-lighter leading-relaxed">
        <section>
          <h2 className="text-xl font-bold text-midnight-lightest mb-2">Responsable du traitement</h2>
          <p>Grow Up Consulting — Christopher Da Silva<br />
          Email : contact@growup-consulting.fr</p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-midnight-lightest mb-2">Données collectées</h2>
          <p>Dans le cadre de l'outil Audit Flash, nous collectons :</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Prénom, adresse email, téléphone (optionnel), nom de l'entreprise</li>
            <li>Secteur d'activité, taille d'équipe, tranche de CA</li>
            <li>Réponses au questionnaire et résultats calculés</li>
          </ul>
        </section>
        <section>
          <h2 className="text-xl font-bold text-midnight-lightest mb-2">Finalité</h2>
          <p>Vos données sont utilisées pour :</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Vous envoyer votre rapport d'audit personnalisé</li>
            <li>Vous recontacter dans le cadre de nos offres de conseil</li>
          </ul>
        </section>
        <section>
          <h2 className="text-xl font-bold text-midnight-lightest mb-2">Base légale</h2>
          <p>Consentement explicite (article 6.1.a du RGPD).</p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-midnight-lightest mb-2">Durée de conservation</h2>
          <p>12 mois à compter de la soumission. Suppression automatique au-delà.</p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-midnight-lightest mb-2">Sous-traitants</h2>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Supabase Inc. — hébergement base de données (serveurs EU)</li>
            <li>Brevo (Sendinblue) — envoi d'emails (France)</li>
            <li>Notion Labs — CRM interne (USA, clauses contractuelles types)</li>
          </ul>
        </section>
        <section>
          <h2 className="text-xl font-bold text-midnight-lightest mb-2">Vos droits</h2>
          <p>Vous disposez d'un droit d'accès, de rectification et de suppression de vos données.
          Pour exercer ces droits, contactez-nous à contact@growup-consulting.fr. Délai de réponse : 30 jours maximum.</p>
        </section>
      </div>
      <div className="mt-10">
        <a href="/" className="text-fire hover:underline">← Retour à l'audit</a>
      </div>
    </div>
  );
}
