import { createQuill } from './main';

const quill = createQuill("#editor", {
    theme: 'quire',
});

quill.on('text-change', () => {
    document.getElementById('debug')!.textContent =
        JSON.stringify(quill.getContents());
});

quill.setContents([
    {"insert": {"formula":"SUM(subtasks.duration, duration)"}},
    {"insert": "\n"},
    {"insert": "bold","attributes":{"style": "color: red; font-size: x-large;", "bold": true}},
    {"insert": {"divider": "hr"}},
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
    
    {"insert": "\n"},

    {"insert": "// Hello world\n", "attributes": {"code-block": "javascript"} },
    {"insert": "function abc(var1, var2) {\n", "attributes": {"code-block": "javascript"} },
    {"insert": "  return 2;\n", "attributes": {"code-block": "javascript"} },
    {"insert": "}\n", "attributes": {"code-block": "javascript"} },
    {"insert": "\n"},
]);