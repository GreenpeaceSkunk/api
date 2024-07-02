# [POST] `/create-donation`
## Schema

| País | Nombre | Tipo | Admite | Condición | Requerido | En conjunto con | Descrición | Ejemplo de uso |
| :-- | -- | -- | -- | -- | -- | -- | -- | -- |
||`donation_type`|`string`|`regular` `oneoff`||`true`|
||`first_name`|`string`||`/^(?=.{2,40}$)[a-zA-Z]+(?:[-' ][a-zA-Z]+)*$/`|`true`|| Admite 1 ó mas palabras y los caracteres `'` `-`|
||`last_name`|`string`||`/^(?=.{2,40}$)[a-zA-Z]+(?:[-' ][a-zA-Z]+)*$/`|`true`|| Admite 1 ó mas palabras y los caracteres `'` `-`|
|🇦🇷|`document_type`|`string`|`dni` `ci` `lc` `le`||`true`|`document_number`|
|🇨🇱|`document_type`|`string`|`rut`||`true`|`document_number`|
|🇨🇴|`document_type`|`string`|`cc` `ce` `pp` `ti` `rc`||`true`|`document_number`|
||`document_number`|`string`|||`true`|`document_type`| Este campo valida el número de documento según el `document_type`||
||`email`|`email`|||`true`|
||`birthdate`|`string`||`/([1-2][0-9]\|[0][1-9]\|[3][0-1])\/([0][1-9]\|[1][0-2])\/[1-9][0-9][0-9]{2}/`|`true`||`DD/MM/YYYY`|`"15/06/1989"`|
||`address_country`|`string`|`argentina` `chile` `colombia`||`true`|
|🇦🇷|`phone_number`|`string`||`/^[0-9]{8,9}$/`|`true`|| Admite dígitos del 0 al 9. Mínimo 8, máximo 9 carácteres|`"41239876"`|
|🇨🇱|`phone_number`|`string`||`/9[0-9]{4}[0-9]{4}/`|`true`|| Admite dígitos del 0 al 9 comenzando con el `"9"`. Total 9 carácteres.|`"912398765"`|
|🇨🇴|`phone_number`|`string`||`/^[0-9]{7,10}$/`|`true`|| Admite dígitos del 0 al 9. Mínimo 7, máximo 10 carácteres|`"9849481"`|
|🇦🇷|`area_code`|`string`||`/^[0-9]{2,4}$/`|`true`|| Admite dígitos del 0 al 9. Mínimo 2, máximo 4 carácteres|`"1234"`|
|🇨🇱|`area_code`|`string`||`56`|`true`|| Debe recibir el valor `"56"`|
|🇨🇴|`area_code`|`string`||`/^[0-9]{3}$/`|`true`|| Admite dígitos del 0 al 9. Máximo 3 carácteres|`"123"`|
|🇦🇷|`address_state`|`object`|`{code: string\|number, name: string}`||`false`|
|🇨🇱|`address_state`|`object`|`{code: string\|number, name: string}`||`false`|
|🇨🇴|`address_state`|`object`|`{code: string\|number, name: string}`||`false`|
||`address_city`|`string`|||`false`|
||`address_street`|`string`|||`false`|
||`address_number`|`string`|||`false`|
||`address_city`|`string`|||`false`|
||`amount`|`number`||`> 1`|`true`|
||`utm_source`|`string`|||`true`|
||`utm_medium`|`string`|||`true`|
||`utm_campaign`|`string`|||`true`|
||`utm_term`|`string`|||`true`|
||`utm_content`|`string`|||`true`|
|🇦🇷|`payment_method`|`string`|`amex` `visa` `visa_debit` `mastercard` `mastercard_debit` `diners` `cabal` `debcabal` `cmr` `cencosud` `naranja`||`true`|
|🇨🇱|`payment_method`|`string`|`amex` `visa` `visa_debit` `mastercard` `mastercard_debit` `diners` `magna` `redcompra` `prepago`||`true`|
|🇨🇴|`payment_method`|`string`|`amex` `visa` `visa_debit` `mastercard` `mastercard_debit` `diners` `codensa` `pse`||`true`|
|🇦🇷|`payment_document_type`|`string`|`dni` `ci` `lc` `le`||`true`|`document_number`|
|🇨🇱|`payment_document_type`|`string`|`rut`||`true`|`document_number`|
|🇨🇴|`payment_document_type`|`string`|`cc` `ce` `pp` `ti` `rc`||`true`|`document_number`|
||`payment_document_number`|`string`|||`true`|`payment_document_type`| Este campo valida el número de documento según el `payment_document_type`||
||`payment_type`|`string`|`credit_card` `bank_account`||`true`|
||`payment_bank_entity_name`|`string`||`payment_type === "bank_account"`|||Es requerido si `payment_type` es igual a `"bank_account"`, de lo contrario es `optional`|`"Banco 1"`|
||`payment_bank_account_type`|`string`|`savings_account` `cheking_account`|`payment_type === "bank_account"`|`false`||**TBD** Es requerido si `payment_type` es igual a `"bank_account"`, de lo contrario es `optional`|`"savings_account"`|
||`payment_bank_account_type`|`string`|`savings_account` `cheking_account`|`payment_type === "bank_account"`|`false`||**TBD** Es requerido si `payment_type` es igual a `"bank_account"`, de lo contrario es `optional`|`"savings_account"`|
||`payment_card_holder_name`|`string`||`payment_type === "credit_card"`|`false`||Es requerido si `payment_type` es igual a `"credit_card"`, de lo contrario es `optional`|`Doe Deer`|
||`payment_card_is_card_holder`|`boolean`||`payment_type === "credit_card"`|`false`||Es requerido si `payment_type` es igual a `"credit_card"`, de lo contrario es `optional`|`Doe Deer`|
||`payment_card_due_date`|`string`||`/^([0][1-9]\|[1][0-2])\/[2-4][0-9]$/`|`true`||`MM/YY`|`"06/26"`|
||`payment_card_token_id`|`string` `number`||`payment_type === "credit_card"`|`false`||Es requerido si `payment_type` es igual a `"credit_card"`, de lo contrario es `optional`|`36376GdgdHdg27`|
||~~`payment_payer_id`~~|~~`string` `number`~~||~~`payment_type === "credit_card"`~~|~~`false`~~||~~Es requerido si `payment_type` es igual a `"credit_card"`, de lo contrario es `optional`~~|
||`donation_start_date`|`date`|||`true`|
||`donation_end_date`|`date`|||`false`||En el caso de que `donation_type` sea igual a `oneoff` el sistema validara que sea igual a `donation_start_date`, de lo contrario es `null`|
||`payment_gateway_name`|`string`|`mercadopago` `payu` `transbank`||`true`|
|🇦🇷|`payment_card_id`|`string`||`payment_gateway_name === "mercadopago"`|`true`||Solo es requerido si `payment_gateway_name` es igual a `"mercadopago"`|
|🇦🇷|`payment_card_issuer_id`|`string`||`payment_gateway_name === "mercadopago"`|`true`||Solo es requerido si `payment_gateway_name` es igual a `"mercadopago"`|
|🇦🇷|`payment_device_id`|`string`||`payment_gateway_name === "mercadopago"`|`true`||Solo es requerido si `payment_gateway_name` es igual a `"mercadopago"`|
|🇨🇴|`payment_card_first6`|`string`||`/^[0-9]{6}$/`|`true`||Solo es requerido si `payment_gateway_name` es igual a `"payu"` y `payment_type` es igual a `"credit_card"`. Admite solo `6` dígitos|
||`salesforce_campaign_id`|`string` `number`|||`false`|

- *1 




donation_type
first_name
last_name
document_type
document_number
email
prefix > area_code
phone > phone_number
birthdate
address_country
address_state
address_city
address_street
address_number
amount
utm_source
utm_medium
utm_campaign
utm_term
utm_content
payment_document_type
payment_document_number
 > payment_method
payment_name > payment_holder_name
payment_due_date > payment_card_due_date
payment_bank_entity_name
payment_is_not_card_holder > payment_card_is_card_holder
payment_credit_card_token_id > payment_card_token_id
donation_start_date
payment_gateway_name
payment_payer_id
payment_card_id
payment_issuer_id
payment_first6 > payment_card_first6

// Nuevo
payment_type": "bank_account"| "credit_card"
payment_bank_account_type
payment_bank_account_number
salesforce_campaign_id  > "7015c0000024Fq4"
device_id: "armor.4b3fb6fc98b4672e8bae91f7b07ec48b55cd2bd530e1dcb373a86f6d79843240361270cd7a994b2017d49df69864a01a496d02477d141458e9386c6a152eeca2e754753c8b8adad8be5dbb2c3b5e3862c2375fc0630866f0c5f29a95e8e612b7.54e2960205d347b0522ab9d831277158"

payment_method_id: "visa"
​payment_type_id: "credit_card"
payment_token: "5d5d044b888975f1c41f5a7f3bd0f5ab"



donation_type
first_name
last_name
document_type
document_number
email
prefix
phone
birthdate
address_country
address_state
address_city
address_street
address_number
amount
utm_source
utm_medium
utm_campaign
utm_term
utm_content

payment_document_type
payment_document_number
payment_name
payment_due_date
payment_due_date
payment_bank_entity_name
payment_is_not_card_holder
payment_credit_card_token_id
donation_start_date
payment_gateway_name
payment_payer_id
payment_card_id
payment_issuer_id
payment_first6






| `amount`  | `number` | `> 1` | `true` |
| `address_country`  | `string` | | `true` |
| `address_state`  | `string` |  |  |
| `address_street`  | `string` | |  |
| `address_number`  | | |  |
| `area_code`  | | |  |
| `birthdate`  | | |  |
| `document_type`  | | |  |
| `document_number`  | | |  |
| `donation_type`  | | |  |
| `donation_start_date`  | | |  |
| `email`  | | |  |
| `last_name`  | | |  |

### Chile

#### Parameters
| Name | Description | Required |
| :-- | -- | -- |
| | | |

#### Request Body
application/json
```json
{
    "amount": 1001,
    "address_country": "chile",
    "address_state": "AT",
    "address_street": "Correa",
    "address_number": 1000,
    "area_code": "56",
    "birthdate": "31/12/1900",
    "document_type": "RUT",
    "document_number": "30.686.957-K",
    "donation_type": "oneoff",
    "donation_start_date": "2012-04-23T18:25:43.511Z",
    "email": "doe.deer@email.org",
    "first_name": "Doe",
    "last_name": "Deer",
    "payment_credit_card_token_id": 4783787529,
    "payment_document_type": "RUT",
    "payment_document_number": "30.686.950-K",
    "payment_due_date": "12/29",
    "payment_first6": "222222",
    "payment_gateway_name": "payu",
    "payment_card_holder_name": "Jhon Doe",
    "payment_is_card_holder": false,
    "payment_method": "amex",
    "phone_number": "94584985498",
    "utm_campaign": "campaign",
    "utm_content": "content",
    "utm_medium": "medium",
    "utm_source": "source",
    "utm_term": "term"
}
```


#### Responses
| Code | Description |
| :-- | -- | -- | -- | -- |
| `201`  | Created |


### Colombia
#### Request Body
```json
{
    "email": "dtovbein@greenpeace.org",
    "donation_type": "oneoff",
    "first_name": "Dan",
    "last_name": "Tovbein",
    "birthdate": "31/12/1900",
    "amount": 1001,
    "document_type": "PP",
    "document_number": "30686222",
    "address_country": "colombia",
    "donation_start_date": "2012-04-23T18:25:43.511Z",
    "address_street": "Correa",
    "address_number": 1000,
    "utm_medium": "medium",
    "utm_source": "source",
    "utm_campaign": "campaign",
    "utm_term": "term",
    "utm_content": "content",
    "payment_document_type": "CC",
    "payment_document_number": "30686957",
    "payment_is_card_holder": false,
    "payment_card_holder_name": "Doe Deer",
    "payment_card_due_date": "12/29",
    "payment_card_token_id": 4783787529,
    "payment_gateway_name": "payu",
    "payment_card_first6": "222222",
    "payment_method": "amex",
    "payment_payer_id": "hf4ry748hdjhjdhj",
    "area_code": "053",
    "phone_number": "94584985498",
    "address_state": "030"
}
```

### Argentina
#### Request Body
```json
{
    "email": "dtovbein@greenpeace.org",
    "donation_type": "oneoff",
    "first_name": "Dan",
    "last_name": "Tovbein",
    "document_type": "DNI",
    "document_number": "30686957",
    "birthdate": "31/12/1900",
    "amount": 1001,
    "address_country": "argentina",
    "donation_start_date": "2012-04-23T18:25:43.511Z",
    "address_street": "Correa",
    "address_number": 1000,
    "utm_medium": "medium",
    "utm_source": "source",
    "utm_campaign": "campaign",
    "utm_term": "term",
    "utm_content": "content",
    "payment_document_type": "LC",
    "payment_document_number": "10020030",
    "payment_card_holder_name": "Doe Deer",
    "payment_due_date": "12/29",
    "payment_is_card_holder": false,
    "payment_credit_card_token_id": 4783787529,
    "payment_gateway_name": "mercadopago",
    "payment_method": "visa_debit",
    "payment_card_id": "873874837387",
    "payment_issuer_id": "23948482",
    "area_code": "053",
    "phone_number": "94584985498"
}
```



# [POST] `/generate-payment`
## Schema

| País | Nombre | Tipo | Admite | Condición | Requerido | En conjunto con | Descrición | Ejemplo de uso |
| :-- | -- | -- | -- | -- | -- | -- | -- | -- |
