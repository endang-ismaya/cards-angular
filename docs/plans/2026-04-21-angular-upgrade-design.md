# Angular 10 → 19 Modernization Design

**Date**: 2026-04-21
**Status**: Approved

## Summary

Modernize an Angular 10 application to Angular 19 using fresh scaffold approach, addressing security vulnerabilities and adopting modern Angular patterns.

## Approach

**Fresh scaffold** - Create a new Angular 19 project, migrate existing components manually. This is faster and cleaner than incremental upgrades (10→11→...→19).

## Component Migration

### Components to Migrate

| Component | Changes |
|-----------|---------|
| AppComponent | Convert to standalone, preserve template/styles |
| CardComponent | Convert to standalone, preserve `@Input()` properties |

### Code Transformation

**Before (Angular 10 - NgModule pattern):**
```typescript
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  @Input() title: string = '';
  @Input() username: string = '';
  @Input() imageUrl: string = '';
  @Input() content: string = '';
  ngOnInit(): void {}
}
```

**After (Angular 19 - Standalone):**
```typescript
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

### Templates & Styles

- No changes to HTML templates
- No changes to CSS styles
- Bulma styling preserved

## Testing Setup

Replace deprecated testing frameworks:

| Old | New |
|-----|-----|
| Karma | Jest |
| Protractor | Playwright |

### Jest Configuration
- Unit tests for components
- Standard Jest config with Angular preset

### Playwright Configuration
- E2e tests for basic app functionality
- Page object pattern optional (small app)

## Dependencies

| Package | Current | Target |
|---------|---------|--------|
| Angular | ~10.0.2 | ~19.x |
| Bulma | ^0.9.0 | ^0.9.0 (keep) |
| TypeScript | ~3.9.5 | ~5.8 (Angular 19 default) |
| RxJS | ~6.5.5 | ~7.x |
| Zone.js | ~0.10.3 | ~0.15.x |
| Jest | - | ^29.x |
| Playwright | - | ^1.40.x |

## File Structure (After Migration)

```
angular_cards/
├── src/
│   ├── app/
│   │   ├── app.component.ts (standalone)
│   │   ├── app.component.html
│   │   ├── app.component.css
│   │   ├── app.component.spec.ts (Jest)
│   │   ├── app.config.ts (replaces AppModule)
│   │   ├── card/
│   │   │   ├── card.component.ts (standalone)
│   │   │   ├── card.component.html
│   │   │   ├── card.component.css
│   │   │   └── card.component.spec.ts (Jest)
│   ├── assets/
│   │   └── img/
│   │       ├── tree.jpeg
│   │       ├── mountain.jpeg
│   │       └── biking.jpeg
│   ├── styles.css (Bulma import)
│   ├── main.ts (bootstrap standalone)
│   ├── index.html
│   └── favicon.ico
├── tests/
│   └── e2e/
│       ├── app.spec.ts (Playwright)
│       └── playwright.config.ts
├── package.json
├── angular.json
├── tsconfig.json
├── tsconfig.app.json
├── jest.config.js
└── playwright.config.ts
```

## Removed Files

- `src/polyfills.ts` (not needed in Angular 19)
- `src/test.ts` (Karma setup - replaced by Jest)
- `src/environments/` (optional - Angular 19 uses simpler config)
- `e2e/` (Protractor - replaced by Playwright)
- `karma.conf.js`
- `protractor.conf.js`
- `tslint.json` (replaced by ESLint in Angular 19)
- `src/app/app.module.ts`

## Security Resolution

All reported vulnerabilities will be resolved by:
1. Fresh dependencies with current versions
2. No legacy transitive dependencies
3. Modern build toolchain (esbuild-based)

## Success Criteria

- [ ] Application builds successfully with `ng build`
- [ ] Application runs with `ng serve`
- [ ] Jest unit tests pass
- [ ] Playwright e2e tests pass
- [ ] Visual appearance unchanged (Bulma styling intact)
- [ ] All security vulnerabilities resolved
- [ ] Node.js v22 compatibility verified