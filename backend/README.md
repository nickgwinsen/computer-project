I was having issues with PYTHONPATH so I created and added a custom path to my virtual envrionment's site-packages folder, `custom.pth`, which contains the current `pwd`.

- Struggled to figure out alembic migration on startup, seems to freeze oddly.
- alembic commands:
- make a db "commit": alembic revision --autogenerate -m "`<string>`"
- update the db to latest commit: alembic upgrade head
