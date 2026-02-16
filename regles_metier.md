# Règles Métier - Application BNGRC

## 1. Types de besoins

Les besoins des sinistrés sont classés en trois catégories :

1. **Nature**
   - Exemple : riz, huile, sucre, farine, etc.
2. **Matériaux**
   - Exemple : tôle, clou, bois, ciment, etc.
3. **Argent**
   - Don monétaire pour couvrir des besoins divers.

---

## 2. Structure d’un besoin

Chaque besoin est défini par :

- **Nom du besoin** : libellé clair (ex : "Riz")  
- **Type** : Nature / Matériaux / Argent  
- **Quantité** : valeur entière positive (ex : 50 kg, 100 unités)  
- **Prix unitaire** : valeur fixe, ne change jamais (ex : 2 000 Ar/kg)  

> Exemple : Besoin de riz dans la ville X : 50 kg à 2 000 Ar/kg

---

## 3. Structure d’un don

Chaque don est défini par :

- **Nom du don** : libellé clair  
- **Type** : Nature / Matériaux / Argent  
- **Quantité** : valeur entière positive  
- **Date de saisie** : utilisée pour l’ordre du dispatch  
- **Ville cible (optionnel)** : si le don est destiné à une ville spécifique  

---

## 4. Dispatch des dons vers les besoins

- Les dons sont attribués **par ordre chronologique de saisie**.  
- Le don est attribué au **besoin correspondant dans une ville**.  
- Si le don est supérieur au besoin, la **quantité restante** peut être attribuée à un autre besoin de même type.  
- Si le besoin est supérieur au don, le besoin reste **partiellement satisfait**.  
- Chaque attribution est enregistrée pour suivi.

---

## 5. Calculs et indicateurs

Pour chaque ville, il faut pouvoir calculer :

- **Total besoins** : somme des quantités × prix unitaire pour tous les besoins de la ville.  
- **Total dons reçus** : somme des dons attribués à la ville.  
- **Reste à satisfaire** : total besoins - total dons reçus.  

> Ces valeurs seront affichées dans le tableau de bord.

---

## 6. Règles de validation

- Toutes les **quantités doivent être positives**.  
- Les prix unitaires ne changent jamais.  
- Les formulaires doivent être validés pour éviter les erreurs de saisie.  
- Protection contre injection SQL et gestion des erreurs doivent être assurées.

---

## 7. Remarques

- Les sinistrés ne sont pas identifiés individuellement, seule la **ville** est prise en compte.  
- Le dispatch automatique doit gérer **tous les cas limites** :  
  - Plus de dons que de besoins  
  - Plus de besoins que de dons  
