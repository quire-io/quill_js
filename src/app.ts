import { createQuill } from './main';

const quill = window['quill'] = createQuill("#editor", {
    theme: 'quire',
    placeholder: 'Compose an epic...',
});

const input = document.getElementById('debug') as HTMLTextAreaElement;

quill.on('text-change', () => {
    input.value = JSON.stringify(
        quill.getContents(), undefined, 1);
});

quill.on('editor-change', (eventType, delta, state, origin) => {
});

document.getElementById('updateBtn')!.addEventListener(
    'click', () => {
        quill.setContents(JSON.parse(input.value));
});

quill.setContents([
    {"insert": "Header1"},
    {"insert": "\n", "attributes": {"header": 1}},
    {"insert": "p1\n"},

    {"insert": "Header2"},
    {"insert": "\n", "attributes": {"header": 2}},
    {"insert": "p2 "},
    {"insert": "code", "attributes": {"code": true}},
    {"insert": " end\n"},
    {"insert": {"formula":"SUM(subtasks.duration, duration)"}},
    {"insert": "\n"},
    {"insert": "bold","attributes":{"style": "color: red; font-size: x-large;", "bold": true}},
    {"insert": {"divider": true}},
    {"insert": {"divider": true}},
    {"insert": {"divider": true}},
    {"insert": "line1"},
    {"insert": {"divider": true}},
    {"insert": "line2\n"},
    {"insert": {"divider": true}},
    {"insert": {"mention": "@rudy"}},
    {"insert": " please look at this issue " },
    {"insert": {"autolink": "https://github.com/quire-io/"} },
    {"insert": " and "},
    {"insert": {"refer": "#897"} },
    {"insert": "\nHere is my email: "},
    {"insert": {"email": "info@quire.io"}},
    {"insert": " and phone number: "},
    {"insert": {"phone": "+1 (000) 000-0000"} },
    {"insert": "\n\n"},

    {"attributes":{
        "link":"http://aa.aa",
    }, "insert":"link without title"},
    {"insert": "\n"},
    {"attributes":{
        "link": {
            "url":"http://aa.aa",
            "title": "link title"
        },
    }, "insert":"link with title"},

    {"insert": "\nemptyblockquote\n"},

    {"attributes":{
        "blockquote":true,
    },"insert":"\n"},

    {"insert": "\nblockquote line break\n"},

    {"insert":"first"},
    {"attributes":{
        "blockquote":true,
    },"insert":"\n\n"},
    {"insert":"second"},
    {"attributes":{
        "blockquote":true,
    },"insert":"\n"},


    {"insert": "\n\n"},

    {"insert":"nested blockquote"},
    {"attributes":{
        "blockquote":true,
    },"insert":"\n"},
    {"insert":"nested blockquote"},
    {"attributes":{
        "nested-blockquote": 1,
    },"insert":"\n"},
    {"insert":"nested blockquote"},
    {"attributes":{
        "nested-blockquote": 2,
    },"insert":"\n"},

    {"insert": "\n"},
    {"insert": "After blockquote" },
    {"insert": "\n"},

    {"insert": "color", "attributes": {"color": "01"}},
    {"insert": " size", "attributes": {"size": "xl"}},
    
    {"insert": "\n"},
    
    {"insert":"bullet 01"},
    {"attributes":{
        "list": "bullet",
    },"insert":"\n"},
    {"insert":"bullet 02"},
    {"attributes":{
        "list": "blank",
    },"insert":"\n"},
    {"insert":"bullet 03"},
    {"attributes":{
        "list": "bullet",
    },"insert":"\n"},
    
    {"insert": "\nnext\n"},

    {"insert":"ordered 01"},
    {"attributes":{
        "list": "ordered",
    },"insert":"\n"},

    {"insert": "\n"},

    {"insert":"ordered 02"},
    {"attributes":{
        "list": "ordered",
    },"insert":"\n"},
    {"insert":"ordered 02-1"},
    {"attributes":{
        "list": "ordered",
        "indent": 1
    },"insert":"\n"},
    {"insert":"ordered 02-2"},
    {"attributes":{
        "list": "blank",
        "indent": 1
    },"insert":"\n"},
    {"insert":"ordered 02-3"},
    {"attributes":{
        "list": "ordered",
        "indent": 1
    },"insert":"\n"},
    {"insert":"ordered 03"},
    {"attributes":{
        "list": "ordered",
    },"insert":"\n"},

    {"insert": "\n"},

    {"insert":"bullet 01"},
    {"attributes":{
        "list": "bullet",
    },"insert":"\n"},
    {"insert":"bullet 01-1"},
    {"attributes":{
        "list": "bullet",
        "indent": 1
    },"insert":"\n"},
    {"insert":"bullet 01-2"},
    {"attributes":{
        "list": "blank",
        "indent": 1
    },"insert":"\n\n"},
    {"insert":"bullet 01-3"},
    {"attributes":{
        "list": "bullet",
        "indent": 1
    },"insert":"\n"},
    {"insert":"bullet 02"},
    {"attributes":{
        "list": "bullet",
    },"insert":"\n"},
    {"insert":"\n"},
    {"insert":"checklist 01"},
    {"insert":"\n", "attributes": {"list": "checked"}},
    {"insert":"checklist 01-a"},
    {"insert":"\n", "attributes": {"list": "checked", "indent": 1}},
    {"insert":"checklist 01-b"},
    {"insert":"\n", "attributes": {"list": "checked", "indent": 1}},
    {"insert":"checklist 02"},
    {"insert":"\n", "attributes": {"list": "unchecked"}},
    {"insert":"checklist 02-a"},
    {"insert":"\n", "attributes": {"list": "checked", "indent": 1}},
    {"insert":"checklist 02-b"},
    {"insert":"\n", "attributes": {"list": "unchecked", "indent": 1}},
    {"insert":"\n"},

    {"insert": "// Hello world\n", "attributes": {"code-block": "javascript"} },
    {"insert": "function abc(var1, var2) {\n", "attributes": {"code-block": "javascript"} },
    {"insert": "  return 2;\n", "attributes": {"code-block": "javascript"} },
    {"insert": "}\n", "attributes": {"code-block": "javascript"} },

    {"insert": "\n"},
    {
        "insert": "1.1"
    },
    {
        "attributes": {
            "table": "1"
        },
        "insert": "\n"
    },
    {
        "insert": "1.2"
    },
    {
        "attributes": {
            "table": "1",
            "align": "center"
        },
        "insert": "\n"
    },
    {
        "insert": "1.3"
    },
    {
        "attributes": {
            "table": "1",
            "align": "right"
        },
        "insert": "\n"
    },
    {
        "insert": "2.1"
    },
    {
        "attributes": {
            "table": "2"
        },
        "insert": "\n"
    },
    {
        "insert": "2.2"
    },
    {
        "attributes": {
            "table": "2",
            "align": "center"
        },
        "insert": "\n"
    },
    {
        "insert": "2.3"
    },
    {
        "attributes": {
            "table": "2",
            "align": "right"
        },
        "insert": "\n"
    },
    {
        "insert": "3.1"
    },
    {
        "attributes": {
            "table": "3"
        },
        "insert": "\n"
    },
    {
        "insert": "3.2"
    },
    {
        "attributes": {
            "table": "3",
            "align": "center"
        },
        "insert": "\n"
    },
    {
        "insert": "3.3"
    },
    {
        "attributes": {
            "table": "3",
            "align": "right"
        },
        "insert": "\n"
    },
    {"insert": "\n"},
]);