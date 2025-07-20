require 'rack'
require 'rack/contrib/try_static'

# Обслуживание статических файлов из _site
use Rack::TryStatic,
  :root => '_site',
  :urls => %w[/],
  :try => ['.html', 'index.html', '/index.html']

# 404 страница
run lambda { |env|
  [404, {'Content-Type' => 'text/html'}, ['<h1>404 - Page Not Found</h1><p>The page you are looking for does not exist.</p>']]
} 