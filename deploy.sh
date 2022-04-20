#! /bin/bash
cd frontend
npm run build
cd ..
echo "deleting backend/public..."
rm -rf backend/public
echo "done"
echo "copy build to backend/public..."
cp -R frontend/build/ backend/public/
echo "done"
git add *
git commit -m "Deploy new version"
git push heroku