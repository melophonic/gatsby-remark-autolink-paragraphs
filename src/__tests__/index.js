const Remark = require(`remark`)
const toString = require(`mdast-util-to-string`)
const visit = require(`unist-util-visit`)

const plugin = require(`../`)

const remark = new Remark().data(`settings`, {
  commonmark: true,
  footnotes: true,
  pedantic: true,
})

describe(`gatsby-remark-autolink-paragraphs`, () => {
  it(`adds id to a markdown paragraph`, () => {
    const markdownAST = remark.parse(`Paragraph Uno`)

    const transformed = plugin({ markdownAST }, {})

    visit(transformed, `paragraph`, node => {
      expect(node.data.id).toBeDefined()

      expect(node).toMatchSnapshot()
    })
  })

  it(`adds ids to each markdown paragraph`, () => {
    const markdownAST = remark.parse(`
Paragraph One

Paragraph Two

Paragraph Three
    `)

    const transformed = plugin({ markdownAST }, {})

    visit(transformed, `paragraph`, node => {
      expect(node.data.id).toBeDefined()
    })
  })

  it(`adds id to a markdown paragraph with custom svg icon`, () => {
    const markdownAST = remark.parse(`Paragraph Uno`)
    const icon = `<svg width="400" height="110"><rect width="300" height="100" /></svg>`

    const transformed = plugin({ markdownAST }, { icon })

    visit(transformed, `paragraph`, node => {
      expect(node.data.id).toBeDefined()

      expect(node).toMatchSnapshot()
    })
  })

  it(`adds ids to each markdown paragraph with custom svg icon`, () => {
    const markdownAST = remark.parse(`
Paragraph One

Paragraph Two

Paragraph Three
    `)
    const icon = `<svg width="400" height="110"><rect width="300" height="100" /></svg>`

    const transformed = plugin({ markdownAST }, { icon })

    visit(transformed, `paragraph`, node => {
      expect(node.data.id).toBeDefined()
    })
  })

  it(`adds id to a markdown paragraph with custom class`, () => {
    const markdownAST = remark.parse(`Paragraph Uno`)
    const className = `custom-class`

    const transformed = plugin({ markdownAST }, { className })

    visit(transformed, `paragraph`, node => {
      expect(node.data.id).toBeDefined()

      expect(node).toMatchSnapshot()
    })
  })

  it(`adds ids to each markdown paragraph with custom class`, () => {
    const markdownAST = remark.parse(`
Paragraph One

Paragraph Two

Paragraph Three
    `)
    const className = `custom-class`

    const transformed = plugin({ markdownAST }, { className })

    visit(transformed, `paragraph`, node => {
      expect(node.data.id).toBeDefined()
    })
  })

  it(`adds id to a markdown paragraph with no icon`, () => {
    const markdownAST = remark.parse(`Paragraph Uno`)
    const icon = false

    const transformed = plugin({ markdownAST }, { icon })

    visit(transformed, `paragraph`, node => {
      expect(node.data.id).toBeDefined()

      expect(node).toMatchSnapshot()
    })
  })

  it(`adds ids to each markdown paragraph with no icon`, () => {
    const markdownAST = remark.parse(`
Paragraph One

Paragraph Two

Paragraph Three
    `)
    const icon = false

    const transformed = plugin({ markdownAST }, { icon })

    visit(transformed, `paragraph`, node => {
      expect(node.data.id).toBeDefined()
    })
  })

  it(`maintain case of markdown paragraph for id`, () => {
    const markdownAST = remark.parse(`
Paragraph One

Paragraph Two

Paragraph Three
    `)
    const maintainCase = true

    const transformed = plugin({ markdownAST }, { maintainCase })

    visit(transformed, `paragraph`, node => {
      expect(node.data.id).toBeDefined()

      expect(node).toMatchSnapshot()
    })
  })
/*
  it(`keeps accents by default`, () => {
    const markdownAST = remark.parse(`
Pāragraph One

Pāragraph Two

Pāragraph Three
    `)
    const removeAccents = false

    const transformed = plugin({ markdownAST }, { removeAccents })

    visit(transformed, `paragraph`, node => {
      expect(node.data.id).toBeDefined()
      expect(node.data.id).toEqual(expect.stringMatching(/^pāragraph/))
    })
  })

  it(`remove accents if removeAccents is passed`, () => {
    const markdownAST = remark.parse(`
Pāragraph One

Pàragraph Two

Paragråph Three
    `)
    const removeAccents = true

    const transformed = plugin({ markdownAST }, { removeAccents })

    visit(transformed, `paragraph`, node => {
      expect(node.data.id).toBeDefined()
      expect(node.data.id).toEqual(expect.stringMatching(/^paragraph/))
    })
  })

  it(`extracts custom id`, () => {
    const markdownAST = remark.parse(`
Paragraph One {#custom_p1}

Paragraph Two {#custom-paragraph-two}

With *Bold* {#custom-withbold}

Invalid {#this_is_italic}

No custom ID

{#id-only}

{#text-after} custom ID
    `)
    const enableCustomId = true

    const transformed = plugin({ markdownAST }, { enableCustomId })

    const paragraphs = []
    visit(transformed, `paragraph`, node => {
      paragraphs.push({ text: toString(node), id: node.data.id })
    })
    expect(paragraphs).toEqual([
      {
        id: `custom_p1`,
        text: `Paragraph One`,
      },
      {
        id: `custom-paragraph-two`,
        text: `Paragraph Two`,
      },
      {
        id: `custom-withbold`,
        text: `With Bold`,
      },
      {
        id: `pp1`,
        text: `Invalid {#thisisitalic}`,
      },
      {
        id: `pp2`,
        text: `No custom ID`,
      },
      {
        id: `pp3`,
        text: `{#id-only}`,
      },
      {
        id: `pp4`,
        text: `{#text-after} custom ID`,
      },
    ])
  })
*/
  it(`adds places anchor after paragraph when isIconAfterParagraph prop is passed`, () => {
    const markdownAST = remark.parse(`Paragraph Uno`)

    const isIconAfterParagraph = true
    const transformed = plugin({ markdownAST }, { isIconAfterParagraph })

    visit(transformed, `paragraph`, node => {
      expect(node.data.hProperties.style).toContain(`position:relative`)
      expect(node.children).toHaveLength(2)
      expect(node.children[1].data.hProperties.class).toContain(`after`)

      expect(node).toMatchSnapshot()
    })
  })

  it(`adds id to a markdown paragraph when elements prop is passed with matching paragraph type`, () => {
    const markdownAST = remark.parse(`Paragraph Uno`)

    const transformed = plugin({ markdownAST }, { elements: [`p`] })

    visit(transformed, `paragraph`, node => {
      expect(node.data.id).toBeDefined()

      expect(node).toMatchSnapshot()
    })
  })


  it(`does not add data to markdown paragraph when an empty array elements prop is passed`, () => {
    const markdownAST = remark.parse(`
    Paragraph One

    Paragraph Two

    Paragraph Three
        `)

    const transformed = plugin({ markdownAST }, { elements: [] })

    visit(transformed, `paragraph`, node => {
      expect(node.data).not.toBeDefined()
    })
  })

})
