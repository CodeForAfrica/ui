<p align="center">
  <img width="235" src="https://user-images.githubusercontent.com/1779590/121872276-c0550b80-cd0d-11eb-970a-3128cecf1bc1.png" alt="PromiseTracker" />
</p>

**PromiseTracker**, is a tool to help journalists and civil society watchdogs more easily track campaign promises and other political / government pledges, using official evidence / data, as well as crowdsourced information, with a transparent and defensible methodology, to help inject accountability and honesty into the often cavalier way that promises are made to citizens to win their support for elections, policies, contracts ... but are then seldom honoured.

## Installation

PromiseTracker is a SSG [Next](https://nextjs.org/) web app deployable to [Vercel](https://vercel.com). See [package.json](./package.json) for the full list of dependencies and build & deploy scripts.

### Local Development

### Environment Variables & Setup

Run the following to get started locally:

```sh
  cp .env.template .env
  # Edit the .env file
  yarn
  yarn dev
```

**Note:** Reach out to the project champion for directions on how to receive the [Check](https://checkmedia.org) and [Sentry](https://sentry.io) tokens

#### Working with COMMONS UI

[COMMONS UI](https://github.com/CodeForAfrica/COMMONS-UI) is a library, developed and maintained by CfA, that packages React components used to develop various UIs.

To build and run the project with COMMONS-UI submodule locally, run:

```sh
  yarn dev:commons
```

COMMONS-UI is now ready to be tested locally. To get started, check out to the branch you want to test:

```sh
  cd COMMONS-UI
  git checkout <desired-branch>
```

To remove COMMONS-UI, run:

```sh
  yarn remove:commons
```

## Attribution

PromiseTracker is modelled on [Rouhani Meter](https://rouhanimeter.com) and made possible thans to the generous support of DW Akademie and Meedan. Built by the Code for Africa Tech team and content courtesy of PesaCheck and ANCIR's iLab teams.

## Contributing

TODO

### License

PromiseTracker is a tool to help journalists and civil society watchdogs more easily track campaign promises and other political / government pledges.  
Copyright (C) 2019 Code for Africa

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program. If not, see <https://www.gnu.org/licenses/>.
