# Look events

IT events API powered by DOU.ua

## API

Source: `https://look-events-api.herokuapp.com`

## Endpoints

-   meta info - `/`
-   list of events **Event[]** - `/events`
-   single event **Event** - `/events/:id`
-   places **string[]** - `/tags/places`
-   topics **string[]** - `/tags/places`

```ts
type Event = {
    id: number
    title: string
    description: string
    image: string
    link: string
    price: string
    places: string[]
    topics: string[]
    time: {
        dates: string[]
        raw: string
    }
}
```

## Example of Event

```json
{
    "id": 20317,
    "title": "Data Science & Engineering Fest",
    "description": "Будущее за данными. Однако наука о данных только начинает по-настоящему набирать обороты.",
    "image": "https://s.dou.ua/CACHE/images/img/events/DATA_fest_logo_RGB/41bd00fde4f9c738c997ffedd6495674.png",
    "link": "https://dou.ua/calendar/20317/",
    "price": "от 110 USD",
    "places": ["Киев"],
    "topics": ["AI", "Data Science", "конференция"],
    "time": {
        "raw": "2 февраля 2019",
        "dates": ["2019-02-01T22:00:00.000Z"]
    }
}
```

## Contibution

NPM Scripts:

-   `dev` : Starting server for development
-   `test` : Run all tests

### Commit Messages

Commit messages should follow the Semantic Commit Messages format:

```
label(namespace): title

description
```

1.  _label_ is one of the following:
    -   `fix` - bug fixes.
    -   `feat` - features.
    -   `test` - changes to tests infrastructure.
    -   `refactor` - code refactoring, styling, formatting etc.
    -   `chore` - non-production changes.
    -   `docs` - changes to docs.
2.  _namespace_ is put in parenthesis after label and is optional.
3.  _title_ is a brief summary of changes.
4.  _description_ is **optional**, new-line separated from title and is in present tense.

Example:

```
fix(Page): fix page.pizza method

This patch fixes page.pizza so that it works with iframes. Fixes #123, Fixes #234
```
