# React practice

База барои branch-ҳои нави практика: React + TypeScript + Vite, Tailwind CSS 4 ва shadcn/ui (`base-nova`, Base UI, Lucide).

```bash
npm ci
npm run dev
```

Санҷиши код:

```bash
npm run lint
npm run build
```

Branch-и нав аз базаи `main` (аввал кори branch-и ҳозираро commit кун):

```bash
git switch -c practice-name main
```

`main` фақат базаи холӣ аст: саҳифаҳои практика ва компонентҳои UI дар он нестанд. Онҳоро дар branch-и практикаат соз ё насб кун.

Барои илова кардани компоненти shadcn, CLI-и дар ҳамин проект насбшударо истифода бар:

```bash
npm run ui -- add @shadcn/card
```

CLI dependency-ҳои компоненти навро ҳам насб мекунад. API-и компонентҳо аз бахши **Base UI**-и документацияи shadcn аст; мисолҳои Radix метавонанд props-и дигар дошта бошанд.

Роҳнамои ягонаи папкаҳо: [STRUCTURE.md](./STRUCTURE.md). Файлҳои холии `.gitkeep` барои нигоҳ доштани папкаҳои холӣ дар Git ҳастанд.
