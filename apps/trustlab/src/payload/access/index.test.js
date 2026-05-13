import {
  canAuthor,
  hasAdminAccess,
  hasAuthorAccess,
  hasCreateUserAccess,
  hasManageUserAccess,
  hasEditorAccess,
  hasLoggedInAccess,
  isAuthor,
} from "./abilities";
import { anyone } from "./anyone";
import { ROLE_ADMIN, ROLE_AUTHOR, ROLE_EDITOR } from "./roles";

describe("payload.access", () => {
  describe("abilities.hasAdminAccess", () => {
    it("allows requests from administrators", () => {
      expect(hasAdminAccess({ req: { user: { role: ROLE_ADMIN } } })).toBe(
        true,
      );
    });

    it("denies requests from authors, editors, and anonymous users", () => {
      expect(hasAdminAccess({ req: { user: { role: ROLE_AUTHOR } } })).toBe(
        false,
      );
      expect(hasAdminAccess({ req: { user: { role: ROLE_EDITOR } } })).toBe(
        false,
      );
      expect(hasAdminAccess({ req: {} })).toBe(false);
      expect(hasAdminAccess(undefined)).toBe(false);
    });
  });

  describe("abilities.isAuthor", () => {
    it("allows users with administrators, authors and editors roles", () => {
      expect(isAuthor({ role: ROLE_ADMIN })).toBe(true);
      expect(isAuthor({ role: ROLE_AUTHOR })).toBe(true);
      expect(isAuthor({ role: ROLE_EDITOR })).toBe(true);
    });

    it("denies users without a valid role", () => {
      expect(isAuthor({ role: "unknown" })).toBe(false);
      expect(isAuthor(1)).toBe(false);
      expect(isAuthor(undefined)).toBe(false);
    });
  });

  describe("abilities.canAuthor", () => {
    it("allows administrators and editors to author any content", () => {
      expect(canAuthor({ role: ROLE_ADMIN })).toBe(true);
      expect(canAuthor({ role: ROLE_EDITOR })).toBe(true);
    });

    it("limits authors to their own content", () => {
      expect(canAuthor({ id: 1, role: ROLE_AUTHOR })).toEqual({
        createdBy: { equals: 1 },
      });
    });

    it("denies authors without a user id for ownership checks", () => {
      expect(canAuthor({ role: ROLE_AUTHOR })).toBe(false);
    });

    it("denies users without a valid role", () => {
      expect(canAuthor({ role: "unknown" })).toBe(false);
      expect(canAuthor(1)).toBe(false);
      expect(canAuthor(undefined)).toBe(false);
    });
  });

  describe("abilities.hasAuthorAccess", () => {
    it("allows requests from administrators, authors and editors", () => {
      expect(hasAuthorAccess({ req: { user: { role: ROLE_ADMIN } } })).toBe(
        true,
      );
      expect(
        hasAuthorAccess({ req: { user: { id: 1, role: ROLE_AUTHOR } } }),
      ).toEqual({ createdBy: { equals: 1 } });
      expect(hasAuthorAccess({ req: { user: { role: ROLE_EDITOR } } })).toBe(
        true,
      );
    });

    it("denies requests from anonymous users", () => {
      expect(hasAuthorAccess({ req: {} })).toBe(false);
      expect(hasAuthorAccess(undefined)).toBe(false);
    });
  });

  describe("abilities.hasCreateUserAccess", () => {
    it("allows requests from administrators and editors", () => {
      expect(hasCreateUserAccess({ req: { user: { role: ROLE_ADMIN } } })).toBe(
        true,
      );
      expect(
        hasCreateUserAccess({ req: { user: { role: ROLE_EDITOR } } }),
      ).toBe(true);
    });

    it("denies requests from authors and anonymous users", () => {
      expect(
        hasCreateUserAccess({ req: { user: { role: ROLE_AUTHOR } } }),
      ).toBe(false);
      expect(hasCreateUserAccess({ req: {} })).toBe(false);
      expect(hasCreateUserAccess(undefined)).toBe(false);
    });
  });

  describe("abilities.hasManageUserAccess", () => {
    it("allows requests from administrators, authors and editors", () => {
      expect(hasManageUserAccess({ req: { user: { role: ROLE_ADMIN } } })).toBe(
        true,
      );
      expect(
        hasManageUserAccess({ req: { user: { id: 1, role: ROLE_AUTHOR } } }),
      ).toEqual({ or: [{ id: { equals: 1 } }] });
      expect(
        hasManageUserAccess({ req: { user: { id: 1, role: ROLE_EDITOR } } }),
      ).toEqual({
        or: [{ id: { equals: 1 } }, { role: { equals: ROLE_AUTHOR } }],
      });
    });

    it("denies requests from invalid-role and anonymous users", () => {
      expect(
        hasManageUserAccess({ req: { user: { id: 1, role: "unknown" } } }),
      ).toBe(false);
      expect(hasManageUserAccess({ req: {} })).toBe(false);
      expect(hasManageUserAccess(undefined)).toBe(false);
    });

    it("denies requests from non-admin users without a user id for ownership checks", () => {
      expect(
        hasManageUserAccess({ req: { user: { role: ROLE_AUTHOR } } }),
      ).toBe(false);
      expect(
        hasManageUserAccess({ req: { user: { role: ROLE_EDITOR } } }),
      ).toBe(false);
    });
  });

  describe("abilities.hasEditorAccess", () => {
    it("allows requests from administrators and editors", () => {
      expect(hasEditorAccess({ req: { user: { role: ROLE_ADMIN } } })).toBe(
        true,
      );
      expect(hasEditorAccess({ req: { user: { role: ROLE_EDITOR } } })).toBe(
        true,
      );
    });

    it("denies requests from authors and anonymous users", () => {
      expect(hasEditorAccess({ req: { user: { role: ROLE_AUTHOR } } })).toBe(
        false,
      );
      expect(hasEditorAccess({ req: {} })).toBe(false);
      expect(hasEditorAccess(undefined)).toBe(false);
    });
  });

  describe("abilities.hasLoggedInAccess", () => {
    it("allows requests with users that have valid roles", () => {
      expect(hasLoggedInAccess({ req: { user: { role: ROLE_ADMIN } } })).toBe(
        true,
      );
      expect(hasLoggedInAccess({ req: { user: { role: ROLE_AUTHOR } } })).toBe(
        true,
      );
      expect(hasLoggedInAccess({ req: { user: { role: ROLE_EDITOR } } })).toBe(
        true,
      );
    });

    it("denies requests without a user that has a valid role", () => {
      expect(hasLoggedInAccess({ req: { user: { role: "unknown" } } })).toBe(
        false,
      );
      expect(hasLoggedInAccess({ req: { user: 1 } })).toBe(false);
      expect(hasLoggedInAccess({ req: {} })).toBe(false);
      expect(hasLoggedInAccess(undefined)).toBe(false);
    });
  });

  describe("anyone.anyone", () => {
    it("allows requests from administrators, authors, editors and anonymous users", () => {
      expect(anyone({ req: { user: { role: ROLE_ADMIN } } })).toBe(true);
      expect(anyone({ req: { user: { role: ROLE_AUTHOR } } })).toBe(true);
      expect(anyone({ req: { user: { role: ROLE_EDITOR } } })).toBe(true);
      expect(anyone({ req: { user: 1 } })).toBe(true);
      expect(anyone({ req: {} })).toBe(true);
      expect(anyone(undefined)).toBe(true);
    });
  });
});
