import { createQuill } from './main';

const quill = createQuill("#editor", {
    theme: 'quire',
});

quill.on('text-change', () => {
    document.getElementById('debug')!.textContent =
        JSON.stringify(quill.getContents());
});

quill.on('editor-change', (eventType, delta, state, origin) => {
});

quill.setContents([
    {"insert": "Header1"},
    {"insert": "\n", "attributes": {"header": 1}},
    {"insert": "p1\n"},

    {"insert": "Header2"},
    {"insert": "\n", "attributes": {"header": 2}},
    {"insert": "p1\n"},
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


    {"insert": "// Hello world\n", "attributes": {"code-block": "javascript"} },
    {"insert": "function abc(var1, var2) {\n", "attributes": {"code-block": "javascript"} },
    {"insert": "  return 2;\n", "attributes": {"code-block": "javascript"} },
    {"insert": "}\n", "attributes": {"code-block": "javascript"} },
    {"insert": "\n"},
]);