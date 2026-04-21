# Angular 10 → 19 Modernization Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Modernize Angular 10 application to Angular 19 with standalone components, Jest testing, and Playwright e2e.

**Architecture:** Fresh scaffold approach - create new Angular 19 project, migrate existing components as standalone, preserve Bulma styling and templates.

**Tech Stack:** Angular 19, TypeScript 5.8, Jest 29, Playwright, Bulma CSS

---

## Prerequisites

- Node.js v22 installed ✓
- npm 11.x installed ✓
- Angular CLI installed globally or use `npx`

---

### Task 1: Backup and Prepare

**Files:**
- N/A (preparation step)

**Step 1: Create backup branch**

```bash
git checkout -b backup-angular10
git push origin backup-angular10
git checkout master
```

**Step 2: Create new branch for upgrade**

```bash
git checkout -b angular19-upgrade
```

**Step 3: Clear old project files (keep docs and assets)**

```bash
# Keep these directories/files:
# - docs/
# - src/assets/
# - README.md
# - main.jpg

rm -rf src/app
rm -rf src/environments
rm -rf e2e
rm -rf node_modules
rm package-lock.json
rm karma.conf.js
rm protractor.conf.js
rm tslint.json
rm src/polyfills.ts
rm src/test.ts
```

---

### Task 2: Scaffold New Angular 19 Project

**Files:**
- Create: `package.json`, `angular.json`, `tsconfig.json`, `tsconfig.app.json`
- Create: `src/main.ts`, `src/index.html`, `src/styles.css`, `src/app/app.component.ts`

**Step 1: Create new Angular 19 project in temp directory**

```bash
cd /tmp
npx @angular/cli@19 new angular_cards_temp --standalone --style=css --routing=false --ssr=false --skip-tests --skip-git
cd angular_cards_temp
```

**Step 2: Copy new project files to original directory**

```bash
# Copy from temp to original (exclude node_modules for now)
cp -r package.json angular.json tsconfig.json tsconfig.app.json /Volumes/eimdata/devs/ws_angular/angular_cards/
cp -r src/main.ts src/index.html src/styles.css src/favicon.ico /Volumes/eimdata/devs/ws_angular/angular_cards/src/
cp -r src/app /Volumes/eimdata/devs/ws_angular/angular_cards/src/
rm -rf /tmp/angular_cards_temp
```

**Step 3: Return to project and verify structure**

```bash
cd /Volumes/eimdata/devs/ws_angular/angular_cards
ls -la src/app/
```

Expected output: `app.component.ts`, `app.component.html`, `app.component.css`, `app.config.ts`

---

### Task 3: Install Dependencies

**Files:**
- Modify: `package.json`

**Step 1: Add Bulma dependency**

```bash
npm install bulma@^0.9.0
```

**Step 2: Install dependencies**

```bash
npm install
```

**Step 3: Verify Angular version**

```bash
npm list @angular/core
```

Expected: `@angular/core@19.x.x`

---

### Task 4: Configure Bulma Styling

**Files:**
- Modify: `src/styles.css`

**Step 1: Add Bulma import to styles.css**

Replace contents of `src/styles.css`:

```css
@import 'bulma/css/bulma.css';

/* Add any custom global styles below */
```

**Step 2: Verify Bulma loads**

```bash
npm run build
```

Expected: Build succeeds without errors

---

### Task 5: Create CardComponent (Standalone)

**Files:**
- Create: `src/app/card/card.component.ts`
- Create: `src/app/card/card.component.html`
- Create: `src/app/card/card.component.css`

**Step 1: Create card directory**

```bash
mkdir -p src/app/card
```

**Step 2: Create card.component.ts**

```typescript
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent {
  @Input() title: string = '';
  @Input() username: string = '';
  @Input() imageUrl: string = '';
  @Input() content: string = '';
}
```

**Step 3: Create card.component.html**

```html
<div class="card">
  <div class="card-image">
    <figure class="image is-4by3">
      <img [src]="imageUrl" [alt]="title">
    </figure>
  </div>
  <div class="card-content">
    <div class="media">
      <div class="media-left">
        <figure class="image is-48x48">
          <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image">
        </figure>
      </div>
      <div class="media-content">
        <p class="title is-4">{{ title }}</p>
        <p class="subtitle is-6">@{{ username }}</p>
      </div>
    </div>
    <div class="content">
      {{ content }}
      <br>
      <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
    </div>
  </div>
</div>
```

**Step 4: Create card.component.css**

```css
/* Card-specific styles if needed */
```

---

### Task 6: Update AppComponent

**Files:**
- Modify: `src/app/app.component.ts`
- Modify: `src/app/app.component.html`
- Modify: `src/app/app.component.css`

**Step 1: Update app.component.ts**

```typescript
import { Component } from '@angular/core';
import { CardComponent } from './card/card.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  posts = [
    {
      title: 'Neat Tree',
      username: 'nature',
      content: 'Saw this awesome tree during my hike today',
      imageUrl: 'assets/img/tree.jpeg',
    },
    {
      title: 'Snowy Mountain',
      username: 'mountainlover',
      content: 'Here is a picture of a snowy mountain',
      imageUrl: 'assets/img/mountain.jpeg',
    },
    {
      title: 'Mountain Biking',
      username: 'biking1234',
      content: 'I did some biking today, yihaa!!!',
      imageUrl: 'assets/img/biking.jpeg',
    },
  ];
}
```

**Step 2: Update app.component.html**

```html
<div class="container" style="margin-top: 20px;">
  <div class="columns">
    <div class="column" *ngFor="let post of posts">
      <app-card
        [title]="post.title"
        [username]="post.username"
        [content]="post.content"
        [imageUrl]="post.imageUrl">
      </app-card>
    </div>
  </div>
</div>
```

**Step 3: Update app.component.css**

```css
/* App-specific styles */
```

---

### Task 7: Update App Configuration

**Files:**
- Modify: `src/app/app.config.ts`

**Step 1: Update app.config.ts for BrowserModule**

```typescript
import { ApplicationConfig } from '@angular/core';
import { provideBrowserGlobalErrorListeners } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
  ],
};
```

**Step 2: Update main.ts bootstrap**

```typescript
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
```

---

### Task 8: Verify Build and Serve

**Files:**
- N/A (verification step)

**Step 1: Build the application**

```bash
npm run build
```

Expected: Build succeeds, output in `dist/cards/`

**Step 2: Serve the application**

```bash
npm run start
```

Expected: App loads at http://localhost:4200, cards display correctly

**Step 3: Commit working migration**

```bash
git add .
git commit -m "feat: migrate to Angular 19 with standalone components"
```

---

### Task 9: Setup Jest for Unit Testing

**Files:**
- Create: `jest.config.js`
- Modify: `package.json`

**Step 1: Install Jest and Angular testing utilities**

```bash
npm install --save-dev jest @angular/build jest-preset-angular @types/jest
```

**Step 2: Remove Karma dependencies**

```bash
npm uninstall karma karma-chrome-launcher karma-coverage-istanbul-reporter karma-jasmine karma-jasmine-html-reporter jasmine-core @types/jasmine @types/jasminewd2
```

**Step 3: Create jest.config.js**

```javascript
module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/dist/', '<rootDir>/tests/'],
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
  passWithNoTests: true,
};
```

**Step 4: Create setup-jest.ts**

```typescript
import 'jest-preset-angular/setup-jest';
```

**Step 5: Update package.json test script**

```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch"
  }
}
```

---

### Task 10: Create Jest Unit Tests

**Files:**
- Create: `src/app/app.component.spec.ts`
- Create: `src/app/card/card.component.spec.ts`

**Step 1: Create app.component.spec.ts**

```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { CardComponent } from './card/card.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, CardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should have 3 posts', () => {
    expect(component.posts.length).toBe(3);
  });

  it('should render cards', () => {
    fixture.detectChanges();
    const cards = fixture.nativeElement.querySelectorAll('app-card');
    expect(cards.length).toBe(3);
  });
});
```

**Step 2: Create card.component.spec.ts**

```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardComponent } from './card.component';

describe('CardComponent', () => {
  let fixture: ComponentFixture<CardComponent>;
  let component: CardComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should accept title input', () => {
    component.title = 'Test Title';
    fixture.detectChanges();
    expect(component.title).toBe('Test Title');
  });

  it('should display title in template', () => {
    component.title = 'Test Title';
    component.username = 'testuser';
    fixture.detectChanges();
    const titleEl = fixture.nativeElement.querySelector('.title.is-4');
    expect(titleEl.textContent).toContain('Test Title');
  });
});
```

**Step 3: Run tests**

```bash
npm run test
```

Expected: All tests pass

**Step 4: Commit Jest setup**

```bash
git add .
git commit -m "feat: add Jest unit testing setup"
```

---

### Task 11: Setup Playwright for E2E Testing

**Files:**
- Create: `playwright.config.ts`
- Create: `tests/e2e/app.spec.ts`
- Modify: `package.json`

**Step 1: Install Playwright**

```bash
npm install --save-dev @playwright/test
npx playwright install chromium
```

**Step 2: Create playwright.config.ts**

```typescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:4200',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    command: 'npm run start',
    url: 'http://localhost:4200',
    reuseExistingServer: !process.env.CI,
  },
});
```

**Step 3: Create tests directory**

```bash
mkdir -p tests/e2e
```

**Step 4: Create tests/e2e/app.spec.ts**

```typescript
import { test, expect } from '@playwright/test';

test.describe('Cards Application', () => {
  test('should load homepage', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('app-root')).toBeVisible();
  });

  test('should display 3 cards', async ({ page }) => {
    await page.goto('/');
    const cards = page.locator('app-card');
    await expect(cards).toHaveCount(3);
  });

  test('should display first card with correct title', async ({ page }) => {
    await page.goto('/');
    const firstCardTitle = page.locator('app-card .title.is-4').first();
    await expect(firstCardTitle).toContainText('Neat Tree');
  });
});
```

**Step 5: Update package.json scripts**

```json
{
  "scripts": {
    "e2e": "playwright test",
    "e2e:ui": "playwright test --ui"
  }
}
```

---

### Task 12: Run Playwright E2E Tests

**Files:**
- N/A (verification step)

**Step 1: Run e2e tests**

```bash
npm run e2e
```

Expected: All tests pass

**Step 2: Commit Playwright setup**

```bash
git add .
git commit -m "feat: add Playwright e2e testing setup"
```

---

### Task 13: Final Verification and Cleanup

**Files:**
- Modify: `package.json` (remove Protractor/Karma references if any)

**Step 1: Verify all scripts work**

```bash
npm run build   # Should succeed
npm run test    # Jest tests pass
npm run e2e     # Playwright tests pass
npm run start   # Dev server starts
```

**Step 2: Verify security vulnerabilities resolved**

```bash
npm audit --registry=https://registry.npmjs.org
```

Expected: No vulnerabilities (or only low/info severity)

**Step 3: Clean up angular.json (remove Karma/Protractor targets)**

Edit `angular.json`, remove "test" and "e2e" architect targets if they reference Karma/Protractor.

**Step 4: Final commit**

```bash
git add .
git commit -m "chore: cleanup legacy config, verify migration complete"
```

**Step 5: Merge to master**

```bash
git checkout master
git merge angular19-upgrade
```

---

## Success Criteria Checklist

- [ ] Application builds: `npm run build` succeeds
- [ ] Dev server runs: `npm run start` works
- [ ] Jest tests pass: `npm run test` passes
- [ ] Playwright tests pass: `npm run e2e` passes
- [ ] Visual unchanged: Cards display with Bulma styling
- [ ] Security audit clean: No high/critical vulnerabilities
- [ ] Standalone components: No NgModule pattern
- [ ] Node v22 compatible: All tools work on Node 22