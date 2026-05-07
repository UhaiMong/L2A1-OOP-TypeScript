<img src="./assets/pickAndomit.jpg" style="width:100%; height:250px"/>

# How `Pick` and `Omit` Keep Your TypeScript DRY

## Introduction

Suppose you have a `User` interface with ten fields — `id`, `name`, `email`, `password`, `role`, `createdAt`, and so on. Now you need a type for a

1. sign-up form (no `id` or `role` yet),
2. another for a public profile (no `password` or sensitive fields),
3. and another for an admin panel update (just a few editable fields).

What do you do? Copy-paste the interface and remove fields each time?

If yes, until someone adds a new field to `User`. You are three different interfaces and updating them all manually. One missed change and you have a bug that TypeScript can't even catch, because your types are no longer derived from the source of truth.

This is exactly what TypeScript's `Pick` and `Omit` utility types solve. They let you create precise, specialized "slices" of a master interface without duplicating a single line. Your code stays **DRY(Don't Repeat Yourself).**

---

## The Problem with Duplicating Interfaces

Let's set up the scenario properly. Here's a master `User` interface:

```typescript
interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: "admin" | "editor" | "viewer";
  bio: string;
  avatarUrl: string;
  createdAt: Date;
  updatedAt: Date;
}
```

Now imagine you need these related types across your codebase:

- `PublicProfile` — for displaying a user's profile (no `password`, no sensitive data)
- `SignUpPayload` — for the registration form (just `name`, `email`, `password`)
- `AdminUpdatePayload` — for an admin editing a user's `role` and `bio`

The duplicating approach:

```typescript
// Manually duplicated — repeat same code base!
interface PublicProfile {
  id: number;
  name: string;
  email: string;
  role: "admin" | "editor" | "viewer";
  bio: string;
  avatarUrl: string;
}

interface SignUpPayload {
  name: string;
  email: string;
  password: string;
}
```

This looks fine until `User` changes. Add a `username` field to `User`, and `PublicProfile` won't have it unless you remember to update it too. These interfaces are now in separate codebases.

---

## `Pick` Take Only What You Need

`Pick<Type, Keys>` creates a new type by selecting a specific subset of keys from an existing type. Think of it like picking necessary columns from a database table.

**Syntax:**

```typescript
Pick<SourceType, "key1" | "key2" | "key3">;
```

**In practice:**

```typescript
interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: "admin" | "editor" | "viewer";
  bio: string;
  avatarUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

// Only pick the fields relevant for a sign-up form
type SignUpPayload = Pick<User, "name" | "email" | "password">;
// { name: string; email: string; password: string; }

function registerUser(payload: SignUpPayload): void {
  console.log(`Registering ${payload.name} with email ${payload.email}`);
}
```

Now `SignUpPayload` is directly derived from `User`. If you rename `email` to `emailAddress` in `User`, TypeScript will immediately flag the broken `Pick` reference — you can't silently have stale derived types.

---

## `Omit` Exclude What You Don't Want

`Omit<Type, Keys>` does the opposite. Instead of specifying what to include, you specify what to leave out. Everything else comes along.

**Syntax:**

```typescript
Omit<SourceType, "key1" | "key2">;
```

**In practice:**

```typescript
// A public-facing profile: everything except sensitive fields
type PublicProfile = Omit<User, "password" | "createdAt" | "updatedAt">;

// Result includes: id, name, email, role, bio, avatarUrl
// password, createdAt, updatedAt are excluded

function renderProfile(profile: PublicProfile): void {
  console.log(`${profile.name} — ${profile.role}`);
  // profile.password  --> TypeScript error! 'password' doesn't exist here
}
```

## `Omit` shines when you have a large interface and only want to exclude a small number of fields. Instead of listing 8 keys in a `Pick`, you just list the 2 you want to remove.

## When to Use Which

| Scenario                                                 | Use                   |
| -------------------------------------------------------- | --------------------- |
| You need a few specific fields from a large interface    | `Pick`                |
| You need everything except one or two sensitive fields   | `Omit`                |
| You want an update payload where all fields are optional | `Partial<Pick<...>>`  |
| You want to enforce required fields on creation          | `Required<Pick<...>>` |

---

## Conclusion

Code duplication is one of the most dificult to capture sources of bugs. Duplicate interfaces feel harmless until your codebase grows and your types start drifting out of sync with each other.

`Pick` and `Omit` solve this at the type level. You define your data shape once in a master interface, and every specialized variant is just a derived slice of it. When the master changes, the change ripples through correctly and TypeScript will catch anything that breaks.

Write your interfaces once. Let TypeScript do the rest.

_**Sincerely**_
</br></br>
_author:_ **Uhai Mong** -Full stack web developer(MERN) </br>
_Published:_ **07 May, 2026 :** _12:00 PM_

**_Thank you_**
