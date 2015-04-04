# sherlocks-api

Wrapper autour du service de paiement en ligne de la LCL, Sherlock's. Le but est de pouvoir supporter plusieurs services à la fois (par exemple les services `pay-reload` et `pay-ticket`, inclus dans les seeders), à destination du même compte bancaire.

## Sherlock's

### Certificats

Les fichiers de configuration importants sont :
* `certif.fr._______`
* `parmcom._________`
* `parmcom.sherlocks`

Ils ne doivent pas être accessibles depuis internet. Ils sont utilisé par l'
exécutable de sherlocks afin de définir les cartes acceptées, le compte du
marchand, l'URL de callback pour la validation d'une transaction, etc. Les `_` sont à remplacer par le numéro de commerçant.

*Note pour le déploiement : Ils sont déjà remplis avec les bonnes valeurs, pas besoin de les modifier. Ils ne sont pas dans ce dépôt, et le chemin est configurable dans ``./config/default.json.``*

Le fichier `pathfile` permet d'indiquer au binaire où se situent tous les autres fichiers de configuration. Il est à passer en argument (`pathfile=/path/to/pathfile`) à chaque appel des binaires de sherlocks.

### Binaires

Il y a deux binaires différents : `/usr/bin/request` et `/usr/bin/response`.

Le premier permet de générer le code du formulaire (qui redirige sur la passerelle de la banque), et le second de déchiffrer la réponse asynchrone retournée par la LCL afin de confirmer le bon déroulement du paiement

Il est possible qu'ils ne veuillent pas s'exécuter (trop vieux ?) - il faut alors suivre la procédure suivante :

> Désormais les API Sherlock's et l'ensemble de la documentation sont disponibles
> en téléchargement sur le site https://sherlocks-telecharger.secure.lcl.fr/
> et les codes d'accès sont les suivants :
>
> `Identifiant : LCL_DEMO`
>
> `Mot de passe : Lcl_Dem1`

*(extrait de la conversation avec le support).*

### Ranges

Les seules ranges qui sont autorisées à faire le callback de confirmation de la transaction sont les suivantes *(extrait de la documentation de sherlocks)* :
* 193.201.76.0/23
* 193.56.46.0/24
* 192.136.30.0/24
* 160.92.0.0/16
* 89.106.184.0/21

### Fonctionnement

*La description pas en compte les technologies comme 3D Secure, qui sont
gérées à 100% au moment de l'étape 3, du côté de LCL.*

(1) Le service demande la création d'un nouveau paiement sur `/pay/:amount`, en précisant le `service` associé et un champ `data` libre. Il reçoit en réponse un `token` et l'`id` de transaction (cet id n'a pas de rapport avec l'id de transaction interne au LCL, qui n'est pas encore connu à cette étape).

(2) Le service redirige l'utilisateur vers `initiate/:id`. L'utilisateur se voit assigner l'`id` de transaction dans son Local Storage, puis redirigé vers la page de la banque.

(3) L'utilisateur procède au paiement.

(4) Deux choix se présentent :
* L'utilisateur
* L'utilisateur a annulé la transaction, il est redirigé vers une page d'erreur de la présente API.

(5) Un serveur

## Documents liés

* [1] http://www.planyo.com/sherlock/sherlock.zip
* [2] http://yodix.free.fr/dim/Pr%C3%A9sentation%20g%C3%A9n%C3%A9rale%20SHERLOCK%27S%20version%2001-2009.pdf
