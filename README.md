# Look events
IT events API powered by DOU.ua

## API

Source: `https://look-events-api.herokuapp.com`

Endpoints:
- Meta info - `/`
- Event - `/events`
- Cities - `/tags/cities`
- Topics - `/tags/topics`

### Commit Messages

Commit messages should follow the Semantic Commit Messages format:

```
label(namespace): title

description
```

1. *label* is one of the following:
    - `fix` - bug fixes.
    - `feat` - features.
    - `test` - changes to tests infrastructure.
    - `refactor` - code refactoring, styling, formatting etc.
    - `chore` - non-production changes.
    - `docs` - changes to docs.
2. *namespace* is put in parenthesis after label and is optional.
3. *title* is a brief summary of changes.
4. *description* is **optional**, new-line separated from title and is in present tense.

Example:

```
fix(Page): fix page.pizza method

This patch fixes page.pizza so that it works with iframes. Fixes #123, Fixes #234
```