import { TreeNode } from "../src/TreeNode";

describe('Tree', () => {
    it('Add Parent', () => {
        const a = new TreeNode('a', 0);
        const b = new TreeNode('b', 0);
        b.addParent(a);
        expect(a.children.map(child => child.name)).toEqual(['b']);
        expect(b.parents.map(parent => parent.name)).toEqual(['a']);
    });

    it('Add Parent 3 gens', () => {
        const a = new TreeNode('a', 0);
        const b = new TreeNode('b', 0);
        const c = new TreeNode('c', 0);
        c.addParent(b);
        b.addParent(a);
        expect(a.children.map(child => child.name)).toEqual(['b']);
        expect(b.children.map(child => child.name)).toEqual(['c']);

        expect(b.parents.map(parent => parent.name)).toEqual(['a']);
        expect(c.parents.map(parent => parent.name)).toEqual(['b']);
    });

    it('Get all ancestor names', () => {
        const a = new TreeNode('a', 0);
        const b = new TreeNode('b', 0);
        const c = new TreeNode('c', 0);
        const x = new TreeNode('x', 0);
        const y = new TreeNode('y', 0);
        const z = new TreeNode('z', 0);
        a.addChild(b);
        b.addChild(c);
        x.addChild(y);
        y.addChild(z);
        z.addChild(c);

        const ancestors = c.getAllAncestorNames();
        console.log(ancestors);
        expect(Array.from(ancestors).sort()).toEqual(['z', 'b', 'y', 'a', 'x'].sort());
    });

    it('getNumChildren', () => {
        const a = new TreeNode('a', 0);
        const b = new TreeNode('b', 0);
        const c = new TreeNode('c', 0);
        const x = new TreeNode('x', 0);
        const y = new TreeNode('y', 0);
        const z = new TreeNode('z', 0);
        a.addChild(b);
        b.addChild(c);
        x.addChild(y);
        y.addChild(z);
        z.addChild(c);

        expect(a.getNumChildren()).toEqual(2);
        expect(x.getNumChildren()).toEqual(3);
        expect(b.getNumChildren()).toEqual(1);
        expect(c.getNumChildren()).toEqual(0);
    });
});