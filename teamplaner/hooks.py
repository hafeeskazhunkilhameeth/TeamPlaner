# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from . import __version__ as app_version

app_name = "teamplaner"
app_title = "TeamPlaner"
app_publisher = "libracore"
app_description = "planning tool for sport teams"
app_icon = "octicon octicon-file-directory"
app_color = "grey"
app_email = "info@libracore.com"
app_license = "MIT"

# Includes in <head>
# ------------------

# include js, css files in header of desk.html
# app_include_css = "/assets/teamplaner/css/teamplaner.css"
# app_include_js = "/assets/teamplaner/js/teamplaner.js"

# include js, css files in header of web template
#web_include_css = "/assets/teamplaner/css/teamplaner.css"
#web_include_js = "/assets/teamplaner/js/teamplaner.js"
base_template_path = "/teamplaner/templates/base.html"
# include js in page
# page_js = {"page" : "public/js/file.js"}

# include js in doctype views
# doctype_js = {"doctype" : "public/js/doctype.js"}
# doctype_list_js = {"doctype" : "public/js/doctype_list.js"}
# doctype_tree_js = {"doctype" : "public/js/doctype_tree.js"}
# doctype_calendar_js = {"doctype" : "public/js/doctype_calendar.js"}

website_route_rules = [
	{"from_route": "/me", "to_route": "ich"}
]

# Home Pages
# ----------

# application home page (will override Website Settings)
home_page = "start"

# website user home page (by Role)
# role_home_page = {
#	"Role": "home_page"
# }

# Website user home page (by function)
# get_website_user_home_page = "teamplaner.utils.get_home_page"

# Generators
# ----------

# automatically create page for each record of this doctype
# website_generators = ["Web Page"]

# Installation
# ------------

# before_install = "teamplaner.install.before_install"
# after_install = "teamplaner.install.after_install"

# Desk Notifications
# ------------------
# See frappe.core.notifications.get_notification_config

# notification_config = "teamplaner.notifications.get_notification_config"

# Permissions
# -----------
# Permissions evaluated in scripted ways

# permission_query_conditions = {
# 	"Event": "frappe.desk.doctype.event.event.get_permission_query_conditions",
# }
#
# has_permission = {
# 	"Event": "frappe.desk.doctype.event.event.has_permission",
# }

# Document Events
# ---------------
# Hook on document methods and events

# doc_events = {
# 	"*": {
# 		"on_update": "method",
# 		"on_cancel": "method",
# 		"on_trash": "method"
#	}
# }

# Scheduled Tasks
# ---------------

# scheduler_events = {
# 	"all": [
# 		"teamplaner.tasks.all"
# 	],
# 	"daily": [
# 		"teamplaner.tasks.daily"
# 	],
# 	"hourly": [
# 		"teamplaner.tasks.hourly"
# 	],
# 	"weekly": [
# 		"teamplaner.tasks.weekly"
# 	]
# 	"monthly": [
# 		"teamplaner.tasks.monthly"
# 	]
# }

# Testing
# -------

# before_tests = "teamplaner.install.before_tests"

# Overriding Whitelisted Methods
# ------------------------------
#
# override_whitelisted_methods = {
# 	"frappe.desk.doctype.event.event.get_events": "teamplaner.event.get_events"
# }

