if (window.jQuery === undefined) {
    console.log('loading jQuery');
    var jq = document.createElement('script');
    jq.src = "//cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js";
    document.getElementsByTagName('head')[0].appendChild(jq);
    setTimeout(function() {
        jQuery.noConflict();
        console.log('jQuery loaded');
        var links = jQuery('body').find("a[href*='summary']");
        console.log(links.length);
        jQuery(links).each(function(i) {
            var newHref = this.href.replace('summary', 'pages');
            var newEditProject = this.href.replace('summary', 'updateProject');
            var newIssues = this.href.replace('summary', 'issues');
            var newMembers = this.href.replace('summary', 'members');
            var newLinks = '<div style="float:right"><a style="color:#1c579d" target="_blank" href="' + newHref + '"> Pages</a> <a style="color:#1c579d" target="_blank" href="' + newEditProject + '"> - Edit project</a>  <a style="color:#1c579d" target="_blank" href="' + newIssues + '"> - Issues</a>  <a style="color:#1c579d" target="_blank" href="' + newMembers + '"> - Members (' + (i + 1) + ')</a></div>';
            jQuery(newLinks).insertAfter(this);
        });
    }, 1000);
    void(0);
} else {
    console.log('jQuery loaded already');
    var links = jQuery('body').find("a[href*='summary']");
    console.log(links.length);
    jQuery(links).each(function(i) {
        var newHref = this.href.replace('summary', 'pages');
        var newEditProject = this.href.replace('summary', 'updateProject');
        var newIssues = this.href.replace('summary', 'issues');
        var newMembers = this.href.replace('summary', 'members');
        var newLinks = '<div style="float:right"><a style="color:#1c579d" target="_blank" href="' + newHref + '"> Pages</a> <a style="color:#1c579d" target="_blank" href="' + newEditProject + '"> - Edit project</a>  <a style="color:#1c579d" target="_blank" href="' + newIssues + '"> - Issues</a>  <a style="color:#1c579d" target="_blank" href="' + newMembers + '"> - Members (' + (i + 1) + ')</a></div>';
        jQuery(newLinks).insertAfter(this);
    });
}