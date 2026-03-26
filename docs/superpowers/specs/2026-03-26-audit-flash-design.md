# Audit Flash — Trouvez votre plus grosse fuite de cash

> Spec de design — Lead Magnet #1 pour Grow Up Consulting
> Date : 2026-03-26
> Statut : Approuve

---

## 1. Vision produit

### Objectif
Un outil web interactif qui permet aux dirigeants de PME d'identifier et chiffrer leur plus grosse fuite operationnelle en 2 minutes. L'outil demontre l'expertise de Grow Up Consulting (double competence DAF + automatisation) et genere des leads qualifies pour l'offre CLEAR UP Diagnostic (2 500 EUR).

### Cible
- Dirigeants / DG de PME (10-250 salaries)
- Secteur services/conseil principalement
- Interlocuteur qui ressent une douleur operationnelle mais ne sait pas la chiffrer

### Promesse
"En 2 minutes, decouvrez combien votre processus le plus defaillant vous coute par an — et comment l'automatiser."

### URL
`audit.growup-consulting.fr`

---

## 2. Parcours utilisateur (5 ecrans)

### Ecran 0 — Landing / Accroche
- Fond sombre Midnight Blue Darkest (`#000f1e`)
- Titre : "Chaque mois, votre entreprise brule du cash sans que vous le voyiez."
- Sous-titre : "En 2 minutes, identifiez votre plus grosse fuite operationnelle et son cout reel."
- CTA unique Fire Bush (`#e3943b`) : "Lancer l'audit"
- Footer : logo Grow Up + "Concu par un ex-DAF & architecte en automatisation"
- Aucun formulaire — zero friction a l'entree

### Ecran 1 — Profilage rapide (~30 sec)
3 questions :
1. **Secteur d'activite** — menu deroulant stylise (Services/Conseil, Formation, Agence, Commerce, BTP, Industrie, Sante, Autre)
2. **Taille d'equipe** — curseur interactif 5-250, chiffre affiche en grand au-dessus en temps reel
3. **CA annuel approximatif** — boutons de tranche (<500K, 500K-1M, 1-3M, 3-10M, >10M)

Transition animee vers ecran suivant.

### Ecran 2 — Choix de l'irritant (~20 sec)
Titre : "Quel processus vous fait perdre le plus de temps ?"

6 cartes visuelles cliquables avec icone + titre + phrase d'accroche :

| # | Processus | Accroche |
|---|-----------|----------|
| 1 | Relances & recouvrement | "Vos factures dorment, votre tresorerie souffre" |
| 2 | Reporting & pilotage | "Vous pilotez a l'aveugle ou dans Excel" |
| 3 | Facturation | "Chaque facture est un parcours du combattant" |
| 4 | Gestion commerciale | "Vos prospects tombent entre les mailles" |
| 5 | Onboarding | "Chaque nouveau collaborateur coute 3 semaines" |
| 6 | Admin & saisie | "Votre equipe copie-colle sa journee" |

Interaction : hover = carte soulevee + bordure Fire Bush. Clic = transition vers questions specifiques.

### Ecran 3 — Questions ciblees (~60 sec)
3-4 questions specifiques au processus choisi. Mix de curseurs, menus deroulants et boutons de choix.

#### Module Relances & recouvrement
- Nombre de factures emises/mois (curseur 10-500)
- Delai moyen de paiement (30j / 45j / 60j / 90j+)
- Qui gere les relances ? (Le dirigeant / Assistant.e / Comptable / Personne)
- Outil actuel (Excel / Logiciel comptable / Rien de formalise)

#### Module Reporting & pilotage
- Frequence des reportings (Hebdo / Mensuel / Trimestriel / Jamais)
- Nombre de sources de donnees (1-2 / 3-5 / 6+)
- Temps passe par reporting (curseur 1-20h)
- Qui compile ? (Le dirigeant / DAF-RAF / Assistant.e / Chacun fait le sien)

#### Module Facturation
- Nombre de factures/mois (curseur 10-500)
- Temps moyen par facture (curseur 5-60 min)
- Taux d'erreur estime (Rare / 1 sur 10 / 1 sur 5 / Frequent)
- Outil actuel (Excel / Word / Logiciel dedie / ERP)

#### Module Gestion commerciale
- Nombre de leads entrants/mois (curseur 5-200)
- Temps moyen avant premier contact (< 1h / < 24h / 24-48h / > 48h / Variable)
- Taux de conversion estime (< 5% / 5-15% / 15-30% / > 30%)
- Outil CRM actuel (Aucun / Excel / CRM dedie / Notes/emails)

#### Module Onboarding
- Nombre de recrutements/an (curseur 1-50)
- Duree moyenne d'onboarding (1 sem / 2 sem / 1 mois / > 1 mois)
- Nombre d'etapes/documents a traiter (< 5 / 5-15 / > 15)
- Qui coordonne ? (RH / Manager / Le nouveau lui-meme / Pas de process)

#### Module Admin & saisie
- Nombre de personnes sur des taches de saisie (curseur 1-50)
- Heures/jour estimees en saisie/copier-coller (curseur 0.5-6h)
- Types de taches (Saisie de donnees / Copier-coller entre outils / Emails repetitifs / MAJ de fichiers)
- Outils principaux (Excel / Google Sheets / ERP / Outils multiples non connectes)

Mini-compteur anime en bas de page pendant la saisie : "Analyse en cours..."

### Ecran 4 — Resultats (le "Aha moment")

#### Zone 1 — Chiffre choc (haut, pleine largeur)
Compteur anime de 0 au montant final :
> "Votre processus de [relance] vous coute **47 500 EUR/an**"

Decomposition en dessous :
- X heures/mois x cout horaire charge = Y EUR (temps perdu)
- + Impact specifique au processus (ex: tresorerie immobilisee, leads perdus, erreurs)

#### Zone 2 — Radar de maturite (milieu)
Radar chart hexagonal, 6 axes = 6 processus.
- Axe du processus choisi : en Fire Bush, score detaille
- 5 autres axes : en gris (`#4c7093`), score estime par secteur/taille, icone cadenas
- Texte : "Vous avez analyse 1 fuite sur 6. Les 5 autres representent potentiellement X EUR supplementaires."

#### Zone 3 — La solution (bas)
- Stack visuelle : icones des outils proposes (Make/n8n + outil specifique) avec fleches de connexion
- Comparaison : "Cout de l'automatisation : **45 EUR/mois** vs **47 500 EUR/an** de pertes"
- ROI estime : "Retour sur investissement en X semaines"

### Ecran 5 — Capture du lead
- Titre : "Recevez votre rapport detaille avec le plan d'action"
- Formulaire :
  - Prenom (requis)
  - Email (requis)
  - Telephone (optionnel)
  - Nom de l'entreprise (requis)
  - Checkbox RGPD (requis) : "J'accepte de recevoir mon rapport et d'etre recontacte par Grow Up Consulting. [Politique de confidentialite]"
- Bouton : "Recevoir mon rapport" (Fire Bush `#e3943b`)
- Lien secondaire : "Ou passez directement a l'action → Reservez votre Audit CLEAR UP (30 min offertes)" + lien Calendly

---

## 3. Logique de calcul

### Formules par processus

#### Relances & recouvrement
```
temps_relance_mensuel = nb_factures * taux_relance_estime[secteur] * temps_moyen_par_relance[outil]
cout_temps = temps_relance_mensuel * cout_horaire_charge[qui_gere]
impact_tresorerie = (CA_mensuel_estime * (delai_paiement - 30) / 365) * taux_cout_cash(0.05)
cout_annuel = (cout_temps + impact_tresorerie) * 12
```

#### Reporting & pilotage
```
cout_compilation = temps_par_reporting * frequence_annuelle * cout_horaire_charge[qui_compile]
cout_decision = benchmark_mauvaise_decision[secteur][nb_sources] * CA_annuel_estime * 0.02
cout_annuel = cout_compilation + cout_decision
```

#### Facturation
```
cout_saisie = nb_factures * temps_par_facture * 12 * cout_horaire_charge
cout_erreurs = nb_factures * taux_erreur * montant_moyen_facture[secteur] * 12 * 0.05
cout_annuel = cout_saisie + cout_erreurs
```

#### Gestion commerciale
```
leads_perdus = nb_leads * taux_perte_par_delai[temps_contact]
manque_a_gagner = leads_perdus * panier_moyen[secteur] * 12
cout_suivi_manuel = nb_leads * temps_suivi[outil_crm] * cout_horaire * 12
cout_annuel = manque_a_gagner + cout_suivi_manuel
```

#### Onboarding
```
cout_admin = nb_recrutements * temps_onboarding * cout_horaire_charge[coordinateur]
cout_productivite = nb_recrutements * semaines_sous_optimal[duree_onboarding] * salaire_hebdo_moyen
cout_annuel = cout_admin + cout_productivite
```

#### Admin & saisie
```
cout_annuel = nb_personnes * heures_jour * 220 * cout_horaire_charge_moyen
```

### Tables de reference (benchmarks)

```json
{
  "cout_horaire_charge": {
    "dirigeant": 85,
    "daf_raf": 55,
    "assistant": 35,
    "comptable": 45,
    "manager": 50,
    "moyen": 40
  },
  "taux_relance_estime": {
    "services_conseil": 0.35,
    "formation": 0.40,
    "agence": 0.25,
    "commerce": 0.30,
    "btp": 0.45,
    "industrie": 0.35,
    "sante": 0.20,
    "autre": 0.30
  },
  "taux_perte_par_delai": {
    "< 1h": 0.10,
    "< 24h": 0.30,
    "24-48h": 0.55,
    "> 48h": 0.78,
    "variable": 0.50
  },
  "panier_moyen": {
    "services_conseil": 5000,
    "formation": 3000,
    "agence": 8000,
    "commerce": 2000,
    "btp": 15000,
    "industrie": 10000,
    "sante": 4000,
    "autre": 5000
  },
  "temps_moyen_par_relance_heures": {
    "excel": 0.5,
    "logiciel_comptable": 0.25,
    "rien": 0.75
  },
  "temps_suivi_par_lead_heures": {
    "aucun": 1.0,
    "excel": 0.75,
    "crm_dedie": 0.3,
    "notes_emails": 0.5
  },
  "coefficient_mauvaise_decision": {
    "1-2_sources": 0.01,
    "3-5_sources": 0.02,
    "6+_sources": 0.035
  },
  "semaines_sous_optimal": {
    "1_sem": 1,
    "2_sem": 2,
    "1_mois": 4,
    "> 1_mois": 8
  },
  "taux_erreur_facturation": {
    "rare": 0.02,
    "1_sur_10": 0.10,
    "1_sur_5": 0.20,
    "frequent": 0.35
  },
  "montant_moyen_facture": {
    "services_conseil": 3500,
    "formation": 2000,
    "agence": 5000,
    "commerce": 500,
    "btp": 8000,
    "industrie": 6000,
    "sante": 1500,
    "autre": 3000
  },
  "frequence_annuelle_reporting": {
    "hebdo": 52,
    "mensuel": 12,
    "trimestriel": 4,
    "jamais": 0
  },
  "suggested_stacks": {
    "relances": ["Make", "Tiime", "Gmail", "Notion"],
    "reporting": ["Make", "Google Sheets", "Notion", "Looker Studio"],
    "facturation": ["Make", "Tiime", "Notion"],
    "commercial": ["Make", "n8n", "Notion CRM", "Gmail"],
    "onboarding": ["Make", "Notion", "Google Drive", "Gmail"],
    "admin": ["Make", "n8n", "Google Sheets", "Notion"]
  },
  "automation_monthly_cost": {
    "relances": 45,
    "reporting": 35,
    "facturation": 30,
    "commercial": 55,
    "onboarding": 40,
    "admin": 50
  }
}
```

Les benchmarks sont calibres pour etre realistes et conservateurs. Mieux vaut sous-estimer et surprendre en audit reel que surestimer et perdre en credibilite.

### Scores estimes (domaines verrouilles)

Pour les 5 domaines non analyses, le score est estime selon une matrice secteur x taille :
- Score de 1 a 5 (1 = critique, 5 = optimise)
- Affiche comme jauge avec label (Critique / Faible / Moyen / Bon / Optimise)
- Base sur des moyennes generiques — volontairement imprecis pour motiver l'audit complet

---

## 4. Architecture technique

### Stack

| Couche | Technologie |
|--------|------------|
| Frontend | React 19 + Vite 7 + Tailwind 4 |
| Animations | Framer Motion |
| Charts | Recharts (radar chart) |
| Backend/BDD | Supabase (instance dediee) |
| Generation PDF | n8n (template HTML → PDF via node headless) |
| Email transactionnel | Brevo API via n8n |
| Orchestration | n8n |
| CRM/Suivi leads | Notion (base CRM & ENTITES existante) |
| Booking | Calendly (lien redirect) |
| Hebergement | VPS OVH — Nginx — SSL Let's Encrypt |
| Domaine | audit.growup-consulting.fr |

### Schema de base de donnees — Supabase

```sql
-- Table principale des leads et resultats d'audit
CREATE TABLE audit_leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT now(),

  -- Profil
  first_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company_name TEXT NOT NULL,
  sector TEXT NOT NULL,
  team_size INTEGER NOT NULL,
  revenue_range TEXT NOT NULL,

  -- Audit
  selected_process TEXT NOT NULL,
  answers JSONB NOT NULL,

  -- Resultats calcules
  annual_cost NUMERIC NOT NULL,
  cost_breakdown JSONB NOT NULL,
  radar_scores JSONB NOT NULL,
  suggested_stack JSONB NOT NULL,
  automation_monthly_cost NUMERIC NOT NULL,
  roi_weeks INTEGER NOT NULL,

  -- Tracking
  pdf_sent BOOLEAN DEFAULT FALSE,
  pdf_sent_at TIMESTAMPTZ,
  calendly_clicked BOOLEAN DEFAULT FALSE,
  source TEXT,
  utm_campaign TEXT,
  utm_medium TEXT,

  -- RGPD
  consent_rgpd BOOLEAN NOT NULL DEFAULT FALSE,
  consent_date TIMESTAMPTZ DEFAULT now(),
  data_deletion_date TIMESTAMPTZ DEFAULT (now() + INTERVAL '12 months')
);

-- Index pour les requetes frequentes
CREATE INDEX idx_audit_leads_email ON audit_leads(email);
CREATE INDEX idx_audit_leads_created_at ON audit_leads(created_at);
CREATE INDEX idx_audit_leads_sector ON audit_leads(sector);

-- RLS : insertion uniquement depuis le frontend (anon), lecture reservee au service role
ALTER TABLE audit_leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous insert"
  ON audit_leads FOR INSERT
  TO anon
  WITH CHECK (consent_rgpd = TRUE);

CREATE POLICY "Service role full access"
  ON audit_leads FOR ALL
  TO service_role
  USING (TRUE);
```

### Flow de donnees

```
[Utilisateur complete l'audit sur le frontend]
        |
        v
[Frontend calcule les resultats cote client]
        |
        v
[POST vers Supabase — insert audit_leads]
  (resultats pre-calcules + reponses + profil + consentement)
        |
        v
[Supabase Database Webhook on INSERT]
        |
        v
[n8n Workflow "Audit Flash — New Lead"]
  |
  |---> Generer PDF rapport (template HTML personnalise → PDF)
  |---> Envoyer email via Brevo API (PDF en PJ + lien Calendly)
  |---> Creer entree dans Notion CRM & ENTITES
  |       (Prenom, Email, Entreprise, Secteur, Irritant, Cout annuel, Date)
  |---> MAJ Supabase : pdf_sent = TRUE
  |---> (J+3) Relance Brevo si pas de clic Calendly
```

### Structure du projet frontend

```
GrowUp_Lead_magnet/
├── public/
│   ├── fonts/              # DM Sans, Space Mono
│   └── images/
│       ├── logo.png
│       └── tool-icons/     # Icones Make, n8n, Notion, etc.
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── index.css           # Tailwind + variables couleurs
│   ├── lib/
│   │   ├── supabase.ts     # Client Supabase
│   │   ├── constants.ts    # Benchmarks, tables de reference
│   │   └── calculations/
│   │       ├── index.ts           # Export commun
│   │       ├── relances.ts
│   │       ├── reporting.ts
│   │       ├── facturation.ts
│   │       ├── commercial.ts
│   │       ├── onboarding.ts
│   │       └── admin.ts
│   ├── components/
│   │   ├── ui/             # Composants generiques (Button, Slider, Card...)
│   │   ├── Landing.tsx     # Ecran 0
│   │   ├── Profiling.tsx   # Ecran 1
│   │   ├── ProcessPicker.tsx  # Ecran 2
│   │   ├── ProcessQuestions.tsx  # Ecran 3
│   │   │   ├── RelancesQuestions.tsx
│   │   │   ├── ReportingQuestions.tsx
│   │   │   ├── FacturationQuestions.tsx
│   │   │   ├── CommercialQuestions.tsx
│   │   │   ├── OnboardingQuestions.tsx
│   │   │   └── AdminQuestions.tsx
│   │   ├── Results.tsx     # Ecran 4
│   │   │   ├── CostCounter.tsx
│   │   │   ├── RadarChart.tsx
│   │   │   └── SolutionStack.tsx
│   │   └── LeadCapture.tsx # Ecran 5
│   ├── hooks/
│   │   ├── useAuditState.ts   # State machine du parcours
│   │   └── useCalculation.ts  # Hook de calcul par processus
│   └── types/
│       └── audit.ts        # Types TypeScript
├── docs/
│   └── superpowers/
│       └── specs/
│           └── 2026-03-26-audit-flash-design.md
├── package.json
├── vite.config.ts
├── tsconfig.json
├── tailwind.config.ts      # si necessaire (Tailwind 4)
└── .env.example
    # VITE_SUPABASE_URL=
    # VITE_SUPABASE_ANON_KEY=
```

---

## 5. Charte graphique appliquee

### Couleurs

| Usage | Couleur | Hex |
|-------|---------|-----|
| Fond principal | Midnight Blue Darkest | `#000f1e` |
| Fond sections | Midnight Blue Darker | `#001428` |
| Fond cartes | Midnight Blue Dark | `#002851` |
| Texte principal | Midnight Blue Lightest | `#e5eaef` |
| Texte secondaire | Midnight Blue Lighter | `#ccd6e0` |
| Accent / CTA / Highlights | Fire Bush | `#e3943b` |
| Hover CTA | Fire Bush Dark | `#b5762f` |
| Fond hover leger | Fire Bush Lightest | `#fcf4eb` (sur texte sombre) |
| Bordures | Midnight Blue Light | `#4c7093` |
| Chiffre choc | Fire Bush Light | `#ebb475` |
| Domaines verrouilles | Midnight Blue Light | `#4c7093` |

### Typographies

| Usage | Police | Poids |
|-------|--------|-------|
| Titres / H1-H3 | DM Sans | Bold (700) |
| Corps de texte | DM Sans | Regular (400) |
| Labels, badges, chiffres techniques | Space Mono | Regular (400) |
| Chiffre choc (compteur) | Space Mono | Bold (700) |

### Principes UI
- Mode sombre exclusif — renforce le cote "outil pro / tableau de bord"
- Animations fluides mais rapides (300-500ms max) — pas de lenteur
- Responsive mobile : les cartes passent en colonne, les curseurs restent utilisables
- Vouvoiement systematique dans tous les textes

---

## 6. RGPD & Mentions legales

### Donnees collectees
- Prenom, email, telephone (optionnel), nom d'entreprise
- Secteur, taille equipe, tranche CA
- Reponses au questionnaire, resultats calcules

### Base legale
Consentement explicite (article 6.1.a RGPD)

### Consentement
- Checkbox obligatoire non pre-cochee
- Texte : "J'accepte que Grow Up Consulting utilise mes donnees pour m'envoyer mon rapport d'audit et me recontacter. Politique de confidentialite."
- Lien vers la politique de confidentialite complete

### Duree de conservation
12 mois a compter de la soumission. Suppression automatique via cron (n8n ou Supabase scheduled function).

### Droits des personnes
- Acces, rectification, suppression sur demande a contact@growup-consulting.fr
- Lien dans le footer du PDF et des emails Brevo
- Delai de reponse : 30 jours max

### Sous-traitants
- Supabase Inc. — hebergement BDD (serveurs EU)
- Brevo (Sendinblue) — envoi emails (FR)
- Notion Labs — CRM interne (US, clauses contractuelles types)

### Mentions legales (page dediee)
Reprises de growup-consulting.fr, adaptees au sous-domaine audit.growup-consulting.fr.

---

## 7. Perimetre et hors-perimetre

### Dans le scope
- Web app React complete (5 ecrans, responsive)
- 6 modules de calcul (1 par processus)
- Table Supabase + RLS + webhook
- Workflow n8n (lead → PDF → Brevo → Notion)
- Template PDF rapport
- Page mentions legales / politique de confidentialite
- Configuration deploiement (Nginx, SSL, sous-domaine)
- Textes et copy en francais, vouvoiement

### Hors scope
- Sequence email de nurturing complete (juste envoi initial + 1 relance J+3)
- Dashboard analytics des leads (suivi via Notion CRM)
- A/B testing
- Lead magnets #2 et #3
- Authentification utilisateur (pas necessaire — soumission anonyme)
- Multilingue
