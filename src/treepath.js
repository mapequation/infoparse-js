export default class TreePath {
  constructor(path) {
    this.path = path.toString();
  }

  static fromArray(path) {
    return !path.length ? TreePath.root() : new TreePath(path.join(":"));
  }

  static join(parentPath, path) {
    if (TreePath.isRoot(parentPath)) {
      return new TreePath(path);
    }
    return TreePath.fromArray([parentPath.toString(), path.toString()]);
  }

  static root() {
    return new TreePath("root");
  }

  static isRoot(path) {
    return path.toString() === "root";
  }

  equal(other) {
    return TreePath.equal(this, other);
  }

  static equal(a, b) {
    return a.toString() === b.toString();
  }

  isAncestor(child) {
    return TreePath.isAncestor(this, child);
  }

  static isAncestor(parent, child) {
    if (TreePath.isRoot(parent)) return true;

    const p = parent.toString();
    const c = child.toString();

    if (p.length >= c.length) return false;

    return c.startsWith(p);
  }

  get level() {
    return TreePath.level(this);
  }

  static level(treePath) {
    return TreePath.isRoot(treePath) ? 0 : TreePath.toArray(treePath).length;
  }

  get rank() {
    if (TreePath.isRoot(this)) return 0;
    const asArray = this.toArray();
    return asArray[asArray.length - 1];
  }

  ancestorAtLevel(level) {
    return TreePath.ancestorAtLevel(this, level);
  }

  static ancestorAtLevel(treePath, level) {
    if (level === 0) return TreePath.root();
    return TreePath.fromArray(TreePath.toArray(treePath).slice(0, level));
  }

  isParentOf(child) {
    return TreePath.isParentOf(this, child);
  }

  static isParentOf(parent, child) {
    const path = TreePath.parentPath(child);
    if (!path) return false;
    return TreePath.equal(parent, path);
  }

  parentPath() {
    return TreePath.parentPath(this.toString());
  }

  static parentPath(path)  {
    if (!TreePath.isTreePath(path)) {
      return null;
    }

    if (TreePath.toArray(path).length === 1) {
      return TreePath.root();
    }

    const p = path.toString();
    return new TreePath(p.substr(0, p.lastIndexOf(":")));
  }

  toString() {
    return this.path;
  }

  toArray() {
    return TreePath.toArray(this.path);
  }

  static toArray(path) {
    return path
      .toString()
      .split(":")
      .map(Number);
  }

  static isTreePath(path) {
    return /^(\d+:)*\d+$/.test(path.toString());
  }
}
