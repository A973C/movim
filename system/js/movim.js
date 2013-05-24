var movimPollHandlers = new Array();
var onloaders = new Array();
var lastkeypress = new Date().getTime();
var lastkeyup = new Date().getTime();

/**
 * Adds a function to the onload event.
 */
function movim_add_onload(func)
{
    onloaders.push(func);
}

/**
 * Function that is run once the page is loaded.
 */
function movim_onload()
{
    for(var i = 0; i < onloaders.length; i++) {
        if(typeof(onloaders[i]) === "function")
    	    onloaders[i]();
    }
}

function log(text)
{
    if(typeof text !== 'undefined') {
        text = text.toString();
        text = text.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }
}

function prependChild(parent,child)
{
    parent.insertBefore(child,parent.childNodes[0]);
}

function movim_parse_form(formname) {
    var form = document.forms[formname];
    if(!form)
        return false;

	var data = H();
	for(var i = 0; i < form.elements.length; i++) {
        if(form.elements[i].type == 'checkbox') {
            data.set(form.elements[i].name,
                     form.elements[i].checked);
        } else if(form.elements[i].type == 'radio'
               && form.elements[i].checked ) {
            data.set(form.elements[i].name,
                     form.elements[i].value);
        } else if(form.elements[i].type != 'radio'){
            data.set(form.elements[i].name,
                     form.elements[i].value);
        }
	}
	return data;
}

function movim_reload(uri) {
    window.location.replace(uri);
}

function movim_reload_this() {
    window.location.reload();
}

/* A magical function to autoresize textarea when typing */
function movim_textarea_autoheight(textbox) {
    textbox.style.height = 0;
    textbox.style.height = textbox.scrollHeight+"px";
}

/**
 * Class manipulation
 */
function movim_has_class(element,classname) {
    var element = document.querySelector(element);
    return element.className.match(new RegExp('(\\s|^)'+classname+'(\\s|$)'));
}

function movim_add_class(element,classname) {
    if(!movim_has_class(element,classname)) {
        var element = document.querySelector(element);
        element.className += " "+classname;
    }
}

function movim_remove_class(element,classname) {
  if (movim_has_class(element,classname)) {
      var reg = new RegExp('(\\s|^)'+classname+'(\\s|$)');
      var element = document.querySelector(element);
      element.className=element.className.replace(reg,' ');
  }
}

function movim_toggle_class(element, classname) {
    if(movim_has_class(element, classname))
        movim_remove_class(element,classname);
    else
        movim_add_class(element, classname);
}

function movim_ajax_script() {
    var s = document.querySelectorAll('.ajaxscript');
    console.log(s);
    for (var i=0; i<s.length; i++)
        eval(s.item(i).firstChild.innerHTML);
}

/**
 * Set a global var for widgets to see if document is focused
 */
var document_focus = true;
var document_title = document.title;
var messages_cpt = 1;
document.onblur = function() { document_focus = false; }
document.onfocus = function() { document_focus = true; document.title = document_title; messages_cpt = 1; }

function movim_title_inc() {
	document.title='[' + messages_cpt + '] ' + document_title ;
	messages_cpt++;
}

function movim_change_class(params) {
    var node = document.getElementById(params[0]);
    node.className = params[1];
}

function movim_toggle_display(param) {
    var node = document.querySelector(param);
    if(node.style.display == 'block')
        node.style.display = 'none';
    else
        node.style.display = 'block';
}

/**
 *  Feed Javascript
 */

function getFeedMessage() {
    var text = document.querySelector('#feedmessagecontent');
    message = text.value;
    text.value = '';
    text.blur();
    return encodeURIComponent(message);
}

function frameHeight(n, text) {
    if(n.className == 'button tiny icon alone add merged left') {
        n.className = 'button tiny icon alone rm merged left';
        text.style.minHeight = '20em';
    } else {
        n.className = 'button tiny icon alone add merged left';
        text.style.minHeight = '1.5em';
    }
}

function richText(n) {
    if(n.className == 'button tiny icon yes merged right') {
        n.className = 'button tiny icon no merged right';
        document.querySelector('.menueditor').style.display = 'block';
    } else {
        n.className = 'button tiny icon yes merged right';
        document.querySelector('.menueditor').style.display = 'none';
    }
}

/**
 * Geolocalisation function
 */

function setPosition(node) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition( 
            function (position) {
                var poss = position.coords.latitude +','+position.coords.longitude;
                node.value = poss;
                
                showPosition(poss);
            }, 
            // next function is the error callback
            function (error) { }
            );
    }
}
