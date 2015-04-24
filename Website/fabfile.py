from __future__ import with_statement
from fabric.api import *
import os, datetime

# to add more features to this file, refer to https://github.com/RacingTadpole/fab-faction/blob/master/fabfile.py
# to add automatic site/app/domain-creation, refer to:
#    http://lukeplant.me.uk/blog/posts/starter-fabfile-and-scripts-for-a-django-project-on-webfaction/

# defaults--same in every environment
env.hosts = ['yourname@yourhost.com']
site_root = '/your/site/root'
local_build_dir = 'build'

def flush_prod():
	with cd(site_root):
		run('rm -rf *')

# `images` is false by default since this could take a while, and doesn't need to be done every deploy
# example usage: `fab deploy_prod:True`
def deploy_prod(images=False):
	
	# finalize with grunt:
	local("grunt finalize")

	# each deploy doesn't pull down from git, but we do enforce a commit at least, so each deploy is tracked
	local("git add --all")
	with settings(warn_only=True):
		# maybe there's nothing to commit? still want to proceed, so suppress this error
		local("git commit")

	# generate a tarball, minus the `images` directory:
	with lcd(local_build_dir):
		local('tar --exclude=\'./images/*\' -zcvf ../build.tar.gz .')
		put('../build.tar.gz', site_root)
		local('rm ../build.tar.gz') # clean up

	# extract dat tarball:
	with cd(site_root):
		run('tar xzf build.tar.gz')
		run('rm build.tar.gz')

	# images not tar'd up, just transferred manually. 
	# don't know a way to do a diff, w/o checking them into git
	if images:
		with cd(site_root):
			put('build/images/', site_root)



