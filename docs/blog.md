---
title: Blog — DevLab
description: Notes and write-ups on platform engineering, Go/Node, and integrations.
---

# Blog

{% if site.posts and site.posts.size > 0 %}
<ul>
{% for post in site.posts %}
  <li>
    <a href="{{ site.baseurl }}{{ post.url }}">{{ post.title }}</a>
    — <small>{{ post.date | date: "%b %d, %Y" }}</small>
  </li>
{% endfor %}
</ul>
{% else %}

*Coming soon.* A few planned topics:
- Bitbucket OAuth callback: clean redirect patterns
- Token refresh in Go with `oauth2`
- Private Bitbucket app: marketplace checklist

{% endif %}

<hr />
<p>
  <a href="{{ site.baseurl }}/privacy">Privacy Policy</a> ·
  <a href="{{ site.baseurl }}/terms">Terms of Service</a>
</p>
